function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $7 = Symbol.for('#__init__'), $9 = Symbol.for('#__initor__'), $10 = Symbol.for('#__inited__'), $8 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('child_process'/*$path$*/);
var $2 = require('../package.json'/*$path$*/);
var $3 = requireDefault$__(require('fs'/*$path$*/));
var $4 = requireDefault$__(require('./ImbaRunner'/*$path$*/));
var $5 = requireDefault$__(require('os'/*$path$*/));
var $6 = requireDefault$__(require('path'/*$path$*/));

class ImbaCompiler {
	[$7]($$ = null){
		this.code = $$ ? $$.code : undefined;
		this.sessionId = $$ ? $$.sessionId : undefined;
		
	}
	/**
	@param {String} code
	@param {String} sessionId
	*/
	constructor(code,sessionId){
		this[$7]();
		if (typeof code !== 'string') {
			
			throw new TypeError('Expected code to be a String.');
		};
		
		if (typeof sessionId !== 'string') {
			
			throw new TypeError('Expected sessionId to be a String.');
		};
		
		this.code = code;
		this.sessionId = sessionId;
	}
	
	/**
	@param {String} code
	@param {String} sessionId
	*/
	static code(code,sessionId){
		
		return new ImbaCompiler(code,sessionId);
	}
	
	get(){
		
		const directory = $6.default.join($5.default.homedir(),("." + $2.name));
		
		if (!($3.default.existsSync(directory))) {
			
			$3.default.mkdirSync(directory,{recursive: true});
		};
		
		$3.default.writeFileSync($6.default.join(directory,this.sessionId),this.code.trim());
		
		const results = $1.execSync(("" + $4.default.instance(true) + " " + $6.default.join(directory,this.sessionId) + " --platform=node --format=cjs --print"));
		
		$3.default.rmSync($6.default.join(directory,this.sessionId));
		
		return results.toString();
	}
};
exports.default = ImbaCompiler;
