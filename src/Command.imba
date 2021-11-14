import { existsSync } from 'fs'
import { join } from 'path'
import { spawn } from 'child_process'
import { version } from '../package.json'
import ImbaRunner from '../lib/ImbaRunner'

export default class Command

	prop args\String[] = []

	get isRuntime
		false

	def constructor
		self.args = process.argv.slice(2)

	def printVersion
		console.log "Imba Shell v{version} (imba {ImbaRunner.version})"

	def displayHelp
		console.log "\x1b[32mUsage:\x1b[0m\n  [\x1b[2m<script>\x1b[0m] [options]\n"

		console.log "\x1b[32mOptions:\x1b[0m"
		console.log "  \x1b[32m-v, --version\x1b[0m         Display help"
		console.log "  \x1b[32m-h, --help\x1b[0m            Display this application version"

	def invalidCommand
		console.log "The \"{self.args[0]}\" option does not exist."

		process.exit 1

	def run
		if self.isRuntime
			if !args[0] then return self.displayHelp!

			if !existsSync(join(process.cwd!, args[0])) && !args[0].trim!.startsWith('-')
				console.log 'Error: Script missing.'

				process.exit 1

		if !(args.length > 0) then return self.handle!

		if args[0].trim! == '--version' || args[0].trim! == '-v'
			return self.printVersion!

		if args[0].trim! == '--help' || args[0].trim! == '-h'
			return self.displayHelp!

		if existsSync(join(process.cwd!, args[0]))
			return self.exec!

		self.invalidCommand!

	def exec
		self.args.splice 1, 0, '--'

		spawn("{ImbaRunner.instance!.slice(0, -1)}", self.args, { stdio: 'inherit', cwd: process.cwd! })

	def handle
		null


