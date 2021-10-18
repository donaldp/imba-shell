function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$child_processφ = require('child_process'/*$path$*/);
var _$fsφ = requireDefault$__(require('fs'/*$path$*/));
var _$ImbaRunnerφ = requireDefault$__(require('./ImbaRunner'/*$path$*/));
var _$pathφ = requireDefault$__(require('path'/*$path$*/));

class ImbaCompiler {
	[Ψ__init__]($$ = null){
		this.code = $$ ? $$.code : undefined;
		
	}
	/**
	@param {String} code
	*/
	constructor(code){
		this[Ψ__init__]();
		if (typeof code !== 'string') {
			
			throw new TypeError('Expected String.');
		};
		
		this.code = code;
	}
	
	/**
	@param {String} code
	*/
	static code(code){
		
		return new ImbaCompiler(code);
	}
	
	get(){
		
		const directory = _$pathφ.default.join(process.cwd(),'node_modules','.imba',_$pathφ.default.basename(process.cwd()));
		
		if (!(_$fsφ.default.existsSync(directory))) {
			
			_$fsφ.default.mkdirSync(directory,{recursive: true});
		};
		
		_$fsφ.default.writeFileSync(_$pathφ.default.join(directory,'repl.imba'),this.code);
		
		const results = _$child_processφ.execSync(("" + _$ImbaRunnerφ.default.instance() + " " + _$pathφ.default.join(directory,'repl.imba') + " --platform=node --print"));
		
		_$fsφ.default.rmSync(_$pathφ.default.join(directory,'repl.imba'));
		
		return results.toString();
	}
};
exports.default = ImbaCompiler;
