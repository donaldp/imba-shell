import { author, version } from '../package.json'
import ImbaCompiler from './ImbaCompiler'
import ImbaRunner from './ImbaRunner'
import repl from 'repl'
import os from 'os'
import path from 'path'

export default class ImbaRepl

	prop ctxCallbacks\Array = []
	prop cmdCallbacks\Array = []
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

	def run options\Object = {}
		if options !== null && (options !== null && typeof options === 'object' && Array.isArray(options) === false) !== true
			throw new TypeError 'Expected repl options to be an Object.'

		console.log "Imba Shell v{version} (imba {ImbaRunner.version}) by {author.split('<')[0]}"

		const server = await repl.start { ...{ prompt: self.prompt }, ...options }

		if self.historyPath
			server.setupHistory self.historyPath, do(err, cb)
				if err then throw err

		for handler in self.ctxCallbacks
			handler server.context

		for handler in self.cmdCallbacks
			server.defineCommand handler.name, handler.callback

		const cmdEval = server.eval

		server.eval = do(cmd, context, file, cb)
			cmdEval(ImbaCompiler.code(cmd).get!, context, file, cb)

		server
