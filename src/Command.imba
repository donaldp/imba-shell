import { existsSync, copyFileSync, unlinkSync } from 'fs'
import { ImbaRunner } from './Runners'
import { join, dirname, basename } from 'path'
import { spawnSync } from 'child_process'
import { version } from '../package.json'

export default class Command

	prop args\string[] = []

	prop watch\boolean = false

	get isRuntime
		false

	def constructor
		self.args = process.argv.slice(2)

	def enableWatcher
		self.watch = true

		self.args = self.args.filter do(arg) !['-w', '--watch'].includes(arg)

	def printVersion
		console.log "Imba Shell v{version} (imba {ImbaRunner.version})"

	def displayHelp
		if self.isRuntime
			console.log "\x1b[32mUsage:\x1b[0m\n  [options] [\x1b[2m<script>\x1b[0m]\n"
		else
			console.log "\x1b[32mUsage:\x1b[0m\n  \x1b[2mimba-shell\x1b[0m [options]\n"

		console.log "\x1b[32mOptions:\x1b[0m"
		console.log "  \x1b[32m-h, --help\x1b[0m            Display help"
		console.log "  \x1b[32m-v, --version\x1b[0m         Display this application version"

		if self.isRuntime
			console.log "  \x1b[32m-w, --watch\x1b[0m           Continously build and watch project"
		else
			console.log "  \x1b[32m    --ts\x1b[0m              Run Repl in TypeScript mode"

	def invalidCommand
		console.log "The \"{self.args[0]}\" option does not exist."

		process.exit 1

	def run
		if self.isRuntime
			if args[0] && (args[0].trim! == '--watch' || args[0].trim! == '-w')
				self.enableWatcher!

			if self.watch == false && !args[0] then return self.displayHelp!

			if (args[0] == undefined && self.watch) || (!existsSync(join(process.cwd!, args[0])) && !args[0].trim!.startsWith('-'))
				console.log 'Error: Script missing.'

				process.exit 1

		if !self.isRuntime && (args.length == 1 && args[0] == '--ts') || !(args.length > 0)
			return self.handle(args[0] ? 'typescript' : 'imba')

		if !(args.length > 0) then return self.handle!

		if args[0].trim! == '--version' || args[0].trim! == '-v'
			return self.printVersion!

		if args[0].trim! == '--help' || args[0].trim! == '-h'
			return self.displayHelp!

		if existsSync(join(process.cwd!, args[0]))
			return self.exec!

		self.invalidCommand!

	def exec
		const fallbackScript = self.createFallbackScript!

		if process.platform === 'win32'
			self.args[0] = fallbackScript || join(process.cwd!, self.args[0])

		self.args.splice 1, 0, '--'

		const watcher = []

		if self.watch then watcher.push '-w'

		const options = {
			stdio: 'inherit',
			cwd: process.cwd!
		}

		if process.platform === 'win32'
			const sh = process.env.comspec || 'cmd'
			const shFlag = '/d /s /c'

			options.windowsVerbatimArguments = true

			spawnSync(sh, [ shFlag, ImbaRunner.instance!, ...watcher, ...self.args ], options)
		else
			spawnSync(ImbaRunner.instance!, [ ...watcher, ...self.args ], options)

		if fallbackScript !== null then unlinkSync(fallbackScript)

	def createFallbackScript
		let sourceScript = null
		let fallbackScript = null

		if !(self.args[0].endsWith('.imba') || self.args[0].endsWith('.ts'))
			sourceScript = join(process.cwd!, self.args[0])
			fallbackScript = join(process.cwd!, dirname(self.args[0]), ".{basename(self.args[0])}.imba")

			try
				copyFileSync(sourceScript, fallbackScript)
				self.args[0] = join(dirname(self.args[0]), ".{basename(self.args[0])}.imba")
			catch e
				fallbackScript = null

		fallbackScript

	def handle
		null
