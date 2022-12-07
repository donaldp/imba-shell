import { execSync } from 'child_process'
import fs from 'fs'
import ImbaMissingException from '../Errors/ImbaMissingException'
import path from 'path'

export default class ImbaRunner

	static get ext
		process.platform === 'win32' ? '.cmd' : ''

	static get imba
		const local\string = path.join(process.cwd!, 'node_modules', '.bin', 'imba')
		const onboard\string = path.join(__dirname, '..', 'node_modules', '.bin', 'imba')

		fs.existsSync(local) ? local : onboard

	static def instance compiler\Boolean = false
		const file = self.imba + (compiler ? 'c' : '') + self.ext

		if !fs.existsSync(file)
			throw new ImbaMissingException "Imba not found at {file}"

		file

	static get version
		execSync("{self.instance(true)} -v").toString!.trim!
