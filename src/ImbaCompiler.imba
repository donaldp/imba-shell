import { execSync } from 'child_process'
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
		const directory\String = path.join os.homedir!, '.imba-shell'

		if !fs.existsSync(directory)
			fs.mkdirSync(directory, { recursive: true })

		fs.writeFileSync(path.join(directory, self.sessionId), self.code.replace(/[   ]{4}/g, '\t').trim!)

		const results\Buffer = execSync("{ImbaRunner.instance!} {path.join(directory, self.sessionId)} --platform=node --print")

		fs.rmSync(path.join(directory, self.sessionId))

		results.toString!
