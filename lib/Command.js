function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $10 = Symbol.for('#__init__'), $13 = Symbol.for('#__initor__'), $14 = Symbol.for('#__inited__'), $11 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('fs'/*$path$*/);
var $2 = require('fs'/*$path$*/);
var $3 = require('fs'/*$path$*/);
var $4 = require('path'/*$path$*/);
var $5 = require('path'/*$path$*/);
var $6 = require('path'/*$path$*/);
var $7 = require('child_process'/*$path$*/);
var $8 = require('../package.json'/*$path$*/);
var $9 = requireDefault$__(require('./ImbaRunner'/*$path$*/));

class Command {
	[$10]($$ = null){
		var $12;
		this.args = ($$ && ($12 = $$.args) !== undefined) ? ($12) : [];
		this.watch = ($$ && ($12 = $$.watch) !== undefined) ? ($12) : false;
		
	}
	get isRuntime(){
		
		return false;
	}
	
	constructor(){
		this[$10]();
		this.args = process.argv.slice(2);
	}
	
	enableWatcher(){
		
		this.watch = true;
		
		return this.args = this.args.filter(function(arg) { return !(['-w','--watch'].includes(arg)); });
	}
	
	printVersion(){
		
		return console.log(("Imba Shell v" + $8.version + " (imba " + ($9.default.version) + ")"));
	}
	
	displayHelp(){
		
		console.log("\x1b[32mUsage:\x1b[0m\n  [\x1b[2m<script>\x1b[0m] [options]\n");
		
		console.log("\x1b[32mOptions:\x1b[0m");
		console.log("  \x1b[32m-v, --version\x1b[0m         Display help");
		console.log("  \x1b[32m-h, --help\x1b[0m            Display this application version");
		return console.log("  \x1b[32m-w, --watch\x1b[0m           Continously build and watch project");
	}
	
	invalidCommand(){
		
		console.log(("The \"" + (this.args[0]) + "\" option does not exist."));
		
		return process.exit(1);
	}
	
	run(){
		
		if (this.isRuntime) {
			
			if (this.args[0] && (this.args[0].trim() == '--watch' || this.args[0].trim() == '-w')) {
				
				this.enableWatcher();
			};
			
			if (this.watch == false && !(this.args[0])) { return this.displayHelp() };
			
			if ((this.args[0] == undefined && this.watch) || (!($1.existsSync($4.join(process.cwd(),this.args[0]))) && !(this.args[0].trim().startsWith('-')))) {
				
				console.log('Error: Script missing.');
				
				process.exit(1);
			};
		};
		
		if (!((this.args.length > 0))) { return this.handle() };
		
		if (this.args[0].trim() == '--version' || this.args[0].trim() == '-v') {
			
			return this.printVersion();
		};
		
		if (this.args[0].trim() == '--help' || this.args[0].trim() == '-h') {
			
			return this.displayHelp();
		};
		
		if ($1.existsSync($4.join(process.cwd(),this.args[0]))) {
			
			return this.exec();
		};
		
		return this.invalidCommand();
	}
	
	exec(){
		
		const fallbackScript = this.createFallbackScript();
		
		if (process.platform === 'win32') {
			
			this.args[0] = fallbackScript || $4.join(process.cwd(),this.args[0]);
		};
		
		this.args.splice(1,0,'--');
		
		const watcher = [];
		
		if (this.watch) { watcher.push('-w') };
		
		$7.spawnSync(("" + $9.default.instance()),[...watcher,...this.args],{
			stdio: 'inherit',
			cwd: process.cwd()
		});
		
		if (fallbackScript !== null) { return $3.unlinkSync(fallbackScript) };
	}
	
	createFallbackScript(){
		
		let sourceScript = null;
		let fallbackScript = null;
		
		if (!(this.args[0].endsWith('.imba'))) {
			
			sourceScript = $4.join(process.cwd(),this.args[0]);
			fallbackScript = $4.join(process.cwd(),$5.dirname(this.args[0]),("." + $6.basename(this.args[0]) + ".imba"));
			
			try {
				
				$2.copyFileSync(sourceScript,fallbackScript);
				this.args[0] = $4.join($5.dirname(this.args[0]),("." + $6.basename(this.args[0]) + ".imba"));
			} catch (e) {
				
				fallbackScript = null;
			};
		};
		
		return fallbackScript;
	}
	
	handle(){
		
		return null;
	}
};
exports.default = Command;
