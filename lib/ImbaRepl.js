function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$jsonφ = require('../package.json'/*$path$*/);
var _$ContextHelpersφ = require('./ContextHelpers'/*$path$*/);
var _$ImbaCompilerφ = requireDefault$__(require('./ImbaCompiler'/*$path$*/));
var _$ImbaRunnerφ = requireDefault$__(require('./ImbaRunner'/*$path$*/));
var _$osφ = requireDefault$__(require('os'/*$path$*/));
var _$pathφ = requireDefault$__(require('path'/*$path$*/));
var _$replφ = requireDefault$__(require('repl'/*$path$*/));

class ImbaRepl {
	[Ψ__init__]($$ = null){
		var vφ;
		this.ctxCallbacks = ($$ && (vφ = $$.ctxCallbacks) !== undefined) ? (vφ) : [];
		this.cmdCallbacks = ($$ && (vφ = $$.cmdCallbacks) !== undefined) ? (vφ) : [];
		this.prompt = ($$ && (vφ = $$.prompt) !== undefined) ? (vφ) : '>>> ';
		this.historyPath = ($$ && (vφ = $$.historyPath) !== undefined) ? (vφ) : null;
		
	}
	/**
	@param {String} prompt
	@param {String|null} historyPath
	*/
	constructor(prompt = '>>> ',historyPath = null){
		this[Ψ__init__]();
		if (typeof prompt !== 'string') {
			
			throw new TypeError('Expected prompt to be a String.');
		};
		
		if (historyPath && typeof historyPath !== 'string') {
			
			throw new TypeError('Expected historyPath to be a String.');
		};
		
		this.prompt = prompt;
		this.historyPath = historyPath;
	}
	
	/**
	@param {Function} callback
	*/
	registerCallback(callback){
		
		if (typeof callback !== 'function') {
			
			throw new TypeError('Expected callback to be a Function.');
		};
		
		this.ctxCallbacks.push(callback);
		
		return this;
	}
	
	/**
	@param {String} name
	@param {Function} callback
	*/
	registerCommand(name,callback){
		
		if (typeof name !== 'string') {
			
			throw new TypeError('Expected command name to be a String.');
		};
		
		this.cmdCallbacks.push({name: name,callback: callback});
		
		return this;
	}
	
	/**
	@param {Object} options
	*/
	async run(options = {}){
		var self = this;
		
		if (options !== null && (options !== null && typeof options === 'object' && Array.isArray(options) === false) !== true) {
			
			throw new TypeError('Expected repl options to be an Object.');
		};
		
		console.log(("Imba Shell v" + _$jsonφ.version + " (imba " + (_$ImbaRunnerφ.default.version) + ") by " + _$jsonφ.author));
		
		const server = await _$replφ.default.start({...{prompt: this.prompt},...options});
		
		if (this.historyPath) {
			
			server.setupHistory(this.historyPath,function(err,cb) {
				
				if (err) { throw err };
			});
		};
		
		self.registerCommand('clear',function() {
			
			_$ContextHelpersφ.clear();
			return process.stdout.write(self.prompt);
		});
		
		self.registerCommand('exit',function() {
			
			return _$ContextHelpersφ.exit();
		});
		
		for (let iφ = 0, itemsφ = iter$__(self.ctxCallbacks), lenφ = itemsφ.length; iφ < lenφ; iφ++) {
			let handler = itemsφ[iφ];
			handler(server.context);
		};
		
		for (let iφ2 = 0, itemsφ2 = iter$__(self.cmdCallbacks), lenφ2 = itemsφ2.length; iφ2 < lenφ2; iφ2++) {
			let handler = itemsφ2[iφ2];
			server.defineCommand(handler.name,handler.callback);
		};
		
		for (let iφ3 = 0, keysφ = Object.keys(_$ContextHelpersφ), lφ = keysφ.length, key, handler; iφ3 < lφ; iφ3++){
			key = keysφ[iφ3];handler = _$ContextHelpersφ[key];
			server.context[key] = handler;
		};
		
		const cmdEval = server.eval;
		
		const sessionId = String(new Date().valueOf());
		
		server.eval = function(cmd,context,file,cb) {
			
			const compiledCode = _$ImbaCompilerφ.default.code(cmd,sessionId).get();
			
			return cmdEval(compiledCode,context,file,async function(error,results) {
				
				if (error) { return cb(error) };
				
				try {
					return cb(null,await Promise.resolve(results));
				} catch (err) {
					
					return cb(err);
				};
			});
		};
		
		server.sessionId = sessionId;
		
		return server;
	}
};
exports.default = ImbaRepl;
