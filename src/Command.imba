import { version } from '../package.json'
import ImbaRunner from '../lib/ImbaRunner'

export default class Command

	prop args\Array = []

	def constructor
		self.args = process.argv.slice(2);

	def printVersion
		console.log "Imba Shell v{version} (imba {ImbaRunner.version})"

	def invalidCommand
		console.log "The \"{self.args[0]}\" option does not exist."

	def run
		if !(args.length > 0) then return self.handle!

		if args[0].trim! == '--version' || args[0].trim! == '-v'
			return self.printVersion!

		self.invalidCommand!

	def handle
		null


