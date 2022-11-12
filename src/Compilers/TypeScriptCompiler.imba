import { spawnSync, execSync } from 'child_process'
import { name } from '../../package.json'
import Compiler from './Compiler'
import fs from 'fs'
import TypeScriptRunner from '../Runners/TypeScriptRunner'
import os from 'os'
import path from 'path'

export default class TypeScriptCompiler < Compiler

	def get
		fs.writeFileSync(path.join(self.directory, "{self.sessionId}.ts"), "{self.code.trim!}")

		let failed = false

		# try to compile ts code.
		try
			const res = spawnSync(TypeScriptRunner.instance!, [path.join(self.directory, "{self.sessionId}.ts"), '-t', 'esnext', '--moduleResolution', 'node', '--noResolve', '--module', 'commonjs', '--skipLibCheck'], {
				stdio: 'pipe'
			})

			let line = res.output.toString()

			if !line.includes("error TS2451: Cannot redeclare block-scoped variable")
				if line.includes("): error TS")
					failed = true

					line = line.split('): error ')[1]

				if line.trim! !== ',,'
					process.stderr.write(line)

		# read from compiled version.
		const results\Buffer = fs.readFileSync(path.join(self.directory, self.sessionId + '.js'))

		# remove compiled ts file.
		fs.rmSync(path.join(self.directory, "{self.sessionId}.js"))

		# remove ts file (source of truth).
		fs.rmSync(path.join(self.directory, "{self.sessionId}.ts"))

		# return results.
		if !failed
			results.toString!
