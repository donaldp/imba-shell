function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$jsonφ = require('../package.json'/*$path$*/);
var _$ImbaRunnerφ = requireDefault$__(require('../lib/ImbaRunner'/*$path$*/));

class Command {
	[Ψ__init__]($$ = null){
		var vφ;
		this.args = ($$ && (vφ = $$.args) !== undefined) ? (vφ) : [];
		
	}
	constructor(){
		this[Ψ__init__]();
		this.args = process.argv.slice(2);;
	}
	
	printVersion(){
		
		return console.log(("Imba Shell v" + _$jsonφ.version + " (imba " + (_$ImbaRunnerφ.default.version) + ")"));
	}
	
	invalidCommand(){
		
		return console.log(("The \"" + (this.args[0]) + "\" option does not exist."));
	}
	
	run(){
		
		if (!((this.args.length > 0))) { return this.handle() };
		
		if (this.args[0].trim() == '--version' || this.args[0].trim() == '-v') {
			
			return this.printVersion();
		};
		
		return this.invalidCommand();
	}
	
	handle(){
		
		return null;
	}
};
exports.default = Command;


