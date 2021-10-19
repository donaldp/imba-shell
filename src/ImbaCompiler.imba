import { execSync } from 'child_process'
import fs from 'fs'
import ImbaRunner from './ImbaRunner'
import os from 'os'
import path from 'path'

export default class ImbaCompiler

	prop code\String

	def constructor code\String
		if typeof code !== 'string'
			throw new TypeError 'Expected String.'

		self.code = code

	static def code code\String
		new ImbaCompiler code

	def get
		const directory\String = path.join os.homedir!, '.imba-shell'

		if !fs.existsSync(directory)
			fs.mkdirSync(directory, { recursive: true })

		const file = String new Date!.valueOf!

		fs.writeFileSync(path.join(directory, file), self.code.replace(/[   ]{4}/g, '	').trim!)

		const results\Buffer = execSync("{ImbaRunner.instance!} {path.join(directory, file)} --platform=node --print")

		fs.rmSync(path.join(directory, file))

		results.toString!
