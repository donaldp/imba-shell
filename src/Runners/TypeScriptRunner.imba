import { execSync } from 'child_process'
import fs from 'fs'
import TypeScriptMissingException from '../Errors/TypeScriptMissingException'
import path from 'path'

export default class TypeScriptRunner

	static get tsc
		const local\string = path.join(process.cwd!, 'node_modules', '.bin', 'tsc')
		const onboard\string = path.join(__dirname, '..', 'node_modules', '.bin', 'tsc')

		fs.existsSync(local) ? local : onboard

	static def instance
		const file = self.tsc

		if !fs.existsSync(file)
			throw new TypeScriptMissingException "tsc not found at {file}"

		file

	static get version
		execSync("{self.instance!} -v").toString!.trim!.split(' ')[1]
