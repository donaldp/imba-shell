import { execSync } from 'child_process'
import fs from 'fs'
import ImbaRunner from './ImbaRunner'
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
		const directory\String = path.join(process.cwd!, 'node_modules', '.imba', path.basename(process.cwd!))

		if !fs.existsSync(directory)
			fs.mkdirSync(directory, { recursive: true })

		fs.writeFileSync(path.join(directory, 'repl.imba'), self.code.replace(/[   ]{4}/g, '	').trim!)

		const results\Buffer = execSync("{ImbaRunner.instance!} {path.join(directory, 'repl.imba')} --platform=node --print")

		fs.rmSync(path.join(directory, 'repl.imba'))

		results.toString!
