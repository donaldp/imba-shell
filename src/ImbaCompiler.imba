import { execSync } from 'child_process'
import { name } from '../package.json'
import fs from 'fs'
import ImbaRunner from './ImbaRunner'
import os from 'os'
import path from 'path'

export default class ImbaCompiler

	prop code\String
	prop sessionId\String

	def constructor code\String, sessionId\String
		if typeof code !== 'string'
			throw new TypeError 'Expected code to be a String.'

		if typeof sessionId !== 'string'
			throw new TypeError 'Expected sessionId to be a String.'

		self.code = code
		self.sessionId = sessionId

	static def code code\String, sessionId\String
		new ImbaCompiler code, sessionId

	def get
		const directory\String = path.join os.homedir!, ".{name}"

		if !fs.existsSync(directory)
			fs.mkdirSync(directory, { recursive: true })

		fs.writeFileSync(path.join(directory, self.sessionId), self.code.trim!)

		const results\Buffer = execSync("{ImbaRunner.instance(true)} {path.join(directory, self.sessionId)} --platform=node --format=cjs --print")

		fs.rmSync(path.join(directory, self.sessionId))

		results.toString!
