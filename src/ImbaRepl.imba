import { author, version } from '../package.json'
import { ImbaCompiler, TypeScriptCompiler } from './Compilers'
import { InvalidLanguageException } from './Errors'
import * as ContextHelpers from './ContextHelpers'
import { ImbaRunner, TypeScriptRunner } from './Runners'
import os from 'os'
import path from 'path'
import repl from 'node:repl'
import UpdateNotifier from './UpdateNotifier'

export default class ImbaRepl

	prop ctxCallbacks\Array<Function> = []
	prop cmdCallbacks\Array<Function> = []
	prop update\boolean|Function = null
	prop language\string = 'imba'
	prop prompt\string = '>>> '
	prop historyPath\string = null

	def constructor language\string = 'imba', prompt\string = '>>> ', historyPath\string = null
		if typeof language !== 'string'
			throw new TypeError 'Expected language to be a String.'

		if !['imba', 'typescript'].includes(language.toLowerCase!)
			throw new InvalidLanguageException 'Expected language to be "imba" or "typescript".'

		if typeof prompt !== 'string'
			throw new TypeError 'Expected prompt to be a String.'

		if historyPath && typeof historyPath !== 'string'
			throw new TypeError 'Expected historyPath to be a String.'

		self.language = language.toLowerCase!
		self.prompt = prompt
		self.historyPath = historyPath

	def registerCallback callback\Function
		if typeof callback !== 'function'
			throw new TypeError 'Expected callback to be a Function.'

		self.ctxCallbacks.push callback

		self

	def registerCommand name\string, callback\Function
		if typeof name !== 'string'
			throw new TypeError 'Expected command name to be a String.'

		self.cmdCallbacks.push { name, callback }

		self

	def shouldUpdate callback\Function = null
		if callback && typeof callback !== 'function'
			throw new TypeError 'Expected callback to be a Function.'

		self.update = callback ? callback : true

		self

	def run options\object = {}
		if options !== null && (options !== null && typeof options === 'object' && Array.isArray(options) === false) !== true
			throw new TypeError 'Expected repl options to be an Object.'

		const compilerVersion\string = self.language == 'imba' ? "imba {ImbaRunner.version}" : "typescript {TypeScriptRunner.version}"

		console.log "Imba Shell v{version} ({compilerVersion}) by Donald Pakkies"

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
			const compiledCode = self.language == 'imba' ? ImbaCompiler.code(cmd, sessionId).get! : TypeScriptCompiler.code(cmd, sessionId).get!

			cmdEval(compiledCode || '', context, file, do(error, results)
				if error then return cb(error)

				try cb(null, await Promise.resolve(results))
				catch err
					cb(err)
			)

		server.sessionId = sessionId

		server.input.on 'keypress', do(chunk, key)
			if key.name == 'tab' && key.shift then server.write '\t'

		server
