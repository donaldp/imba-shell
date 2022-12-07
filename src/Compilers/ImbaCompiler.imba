import { execSync } from 'child_process'
import { name } from '../../package.json'
import { ImbaRunner, TypeScriptRunner } from '../Runners'
import Compiler from './Compiler'
import fs from 'fs'
import os from 'os'
import path from 'path'

export default class ImbaCompiler < Compiler
	def get
		fs.writeFileSync(path.join(self.directory, self.sessionId), self.code.trim!)

		const results\Buffer = execSync("{ImbaRunner.instance(true)} {path.join(self.directory, self.sessionId)} --platform=node --format=cjs --print")

		fs.rmSync(path.join(self.directory, self.sessionId))

		results.toString!
