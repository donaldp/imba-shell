import { execSync } from 'child_process'
import fs from 'fs'
import ImbaMissingException from './Error/ImbaMissingException'
import path from 'path'

export default class ImbaRunner

	static get imba
		const local\String = path.join(process.cwd!, 'node_modules', '.bin', 'imbac')
		const onboard\String = path.join(__dirname, '..', 'node_modules', '.bin', 'imbac')

		fs.existsSync(local) ? local : onboard

	static def instance
		if !fs.existsSync(self.imba)
			throw new ImbaMissingException `Imba not found at ${self.imba}`

		self.imba

	static get version
		execSync("{self.instance!} -v").toString!.trim!