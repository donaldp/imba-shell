function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$fsφ = require('fs'/*$path$*/);
var _$pathφ = require('path'/*$path$*/);
var _$child_processφ = require('child_process'/*$path$*/);
var _$jsonφ = require('../package.json'/*$path$*/);
var _$ImbaRunnerφ = requireDefault$__(require('../lib/ImbaRunner'/*$path$*/));

class Command {
	[Ψ__init__]($$ = null){
		var vφ;
		this.args = ($$ && (vφ = $$.args) !== undefined) ? (vφ) : [];
		
	}
	get isRuntime(){
		
		return false;
	}
	
	constructor(){
		this[Ψ__init__]();
		this.args = process.argv.slice(2);
	}
	
	printVersion(){
		
		return console.log(("Imba Shell v" + _$jsonφ.version + " (imba " + (_$ImbaRunnerφ.default.version) + ")"));
	}
	
	displayHelp(){
		
		console.log("\x1b[32mUsage:\x1b[0m\n  [\x1b[2m<script>\x1b[0m] [options]\n");
		
		console.log("\x1b[32mOptions:\x1b[0m");
		console.log("  \x1b[32m-v, --version\x1b[0m         Display help");
		return console.log("  \x1b[32m-h, --help\x1b[0m            Display this application version");
	}
	
	invalidCommand(){
		
		console.log(("The \"" + (this.args[0]) + "\" option does not exist."));
		
		return process.exit(1);
	}
	
	run(){
		
		if (this.isRuntime) {
			
			if (!(this.args[0])) { return this.displayHelp() };
			
			if (!(_$fsφ.existsSync(_$pathφ.join(process.cwd(),this.args[0]))) && !(this.args[0].trim().startsWith('-'))) {
				
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
		
		if (_$fsφ.existsSync(_$pathφ.join(process.cwd(),this.args[0]))) {
			
			return this.exec();
		};
		
		return this.invalidCommand();
	}
	
	exec(){
		
		this.args.splice(1,0,'--');
		
		return _$child_processφ.spawn(("" + _$ImbaRunnerφ.default.instance().slice(0,-1)),this.args,{stdio: 'inherit',cwd: process.cwd()});
	}
	
	handle(){
		
		return null;
	}
};
exports.default = Command;


