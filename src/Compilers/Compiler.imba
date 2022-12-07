import { name } from '../../package.json'
import fs from 'fs'
import os from 'os'
import path from 'path'

export default class Compiler

	prop directory\string = path.join os.tmpdir!, ".{name}"
	prop code\string
	prop sessionId\string

	def constructor code\string, sessionId\string
		if typeof code !== 'string'
			throw new TypeError 'Expected code to be a String.'

		if typeof sessionId !== 'string'
			throw new TypeError 'Expected sessionId to be a String.'

		if !fs.existsSync(self.directory)
			fs.mkdirSync(self.directory, { recursive: true })

		self.code = code
		self.sessionId = sessionId

	static def code code\string, sessionId\string
		new self code, sessionId
