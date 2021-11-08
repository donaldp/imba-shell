import { author, version } from '../package.json'
import * as ContextHelpers from './ContextHelpers'
import ImbaCompiler from './ImbaCompiler'
import ImbaRunner from './ImbaRunner'
import os from 'os'
import path from 'path'
import repl from 'repl'
import UpdateNotifier from './UpdateNotifier'

export default class ImbaRepl

	prop ctxCallbacks\Array = []
	prop cmdCallbacks\Array = []
	prop update\Boolean|Function = null
	prop prompt\String = '>>> '
	prop historyPath\String = null

	def constructor prompt\String = '>>> ', historyPath\String|null = null
		if typeof prompt !== 'string'
			throw new TypeError 'Expected prompt to be a String.'

		if historyPath && typeof historyPath !== 'string'
			throw new TypeError 'Expected historyPath to be a String.'

		self.prompt = prompt
		self.historyPath = historyPath

	def registerCallback callback\Function
		if typeof callback !== 'function'
			throw new TypeError 'Expected callback to be a Function.'

		self.ctxCallbacks.push callback

		self

	def registerCommand name\String, callback\Function
		if typeof name !== 'string'
			throw new TypeError 'Expected command name to be a String.'

		self.cmdCallbacks.push { name, callback }

		self

	def shouldUpdate callback\Function = null
		if callback && typeof callback !== 'function'
			throw new TypeError 'Expected callback to be a Function.'

		self.update = callback ? callback : true

		self

	def run options\Object = {}
		if options !== null && (options !== null && typeof options === 'object' && Array.isArray(options) === false) !== true
			throw new TypeError 'Expected repl options to be an Object.'

		console.log "Imba Shell v{version} (imba {ImbaRunner.version}) by {author}"

		if self.update then (new UpdateNotifier).check self.update

		const server = await repl.start { ...{ prompt: self.prompt }, ...options }

		if self.historyPath
			server.setupHistory self.historyPath, do(err, cb)
				if err then throw err

		self.registerCommand 'clear', do
			ContextHelpers.clear!
			process.stdout.write self.prompt

		self.registerCommand 'exit', do
			ContextHelpers.exit!

		for handler in self.ctxCallbacks
			handler server.context

		for handler in self.cmdCallbacks
			server.defineCommand handler.name, handler.callback

		for own key, handler of ContextHelpers
			server.context[key] = handler

		const cmdEval = server.eval

		const sessionId = String new Date!.valueOf!

		server.eval = do(cmd, context, file, cb)
			const compiledCode = ImbaCompiler.code(cmd, sessionId).get!

			cmdEval(compiledCode, context, file, do(error, results)
				if error then return cb(error)

				try cb(null, await Promise.resolve(results))
				catch err
					cb(err)
			)

		server.sessionId = sessionId

		server.input.on 'keypress', do(chunk, key)
			if key.name == 'tab' && key.shift then server.write '\t'

		server
