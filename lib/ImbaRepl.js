function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};;
function iter$__(a){ let v; return a ? ((v=a.toIterable) ? v.call(a) : a) : []; };
const $9 = Symbol.for('#__init__'), $21 = Symbol.for('#__initor__'), $22 = Symbol.for('#__inited__'), $10 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('../package.json'/*$path$*/);
var $2 = require('./ContextHelpers'/*$path$*/);
var $3 = requireDefault$__(require('./ImbaCompiler'/*$path$*/));
var $4 = requireDefault$__(require('./ImbaRunner'/*$path$*/));
var $5 = requireDefault$__(require('os'/*$path$*/));
var $6 = requireDefault$__(require('path'/*$path$*/));
var $7 = requireDefault$__(require('repl'/*$path$*/));
var $8 = requireDefault$__(require('./UpdateNotifier'/*$path$*/));

class ImbaRepl {
	[$9]($$ = null){
		var $11;
		this.ctxCallbacks = ($$ && ($11 = $$.ctxCallbacks) !== undefined) ? ($11) : [];
		this.cmdCallbacks = ($$ && ($11 = $$.cmdCallbacks) !== undefined) ? ($11) : [];
		this.update = ($$ && ($11 = $$.update) !== undefined) ? ($11) : null;
		this.prompt = ($$ && ($11 = $$.prompt) !== undefined) ? ($11) : '>>> ';
		this.historyPath = ($$ && ($11 = $$.historyPath) !== undefined) ? ($11) : null;
		
	}
	/**
	@param {String} prompt
	@param {String|null} historyPath
	*/
	constructor(prompt = '>>> ',historyPath = null){
		this[$9]();
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
	@param {Function} callback
	*/
	shouldUpdate(callback = null){
		
		if (callback && typeof callback !== 'function') {
			
			throw new TypeError('Expected callback to be a Function.');
		};
		
		this.update = callback ? callback : true;
		
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
		
		console.log(("Imba Shell v" + $1.version + " (imba " + ($4.default.version) + ") by Donald Pakkies"));
		
		if (this.update) { (new $8.default).check(this.update) };
		
		const server = await $7.default.start({...{prompt: this.prompt},...options});
		
		if (this.historyPath) {
			
			server.setupHistory(this.historyPath,function(err,cb) {
				
				if (err) { throw err };
			});
		};
		
		self.registerCommand('clear',function() {
			
			$2.clear();
			return process.stdout.write(self.prompt);
		});
		
		self.registerCommand('exit',function() {
			
			return $2.exit();
		});
		
		for (let $12 = 0, $13 = iter$__(self.ctxCallbacks), $14 = $13.length; $12 < $14; $12++) {
			let handler = $13[$12];
			handler(server.context);
		};
		
		for (let $15 = 0, $16 = iter$__(self.cmdCallbacks), $17 = $16.length; $15 < $17; $15++) {
			let handler = $16[$15];
			server.defineCommand(handler.name,handler.callback);
		};
		
		for (let $18 = 0, $19 = Object.keys($2), $20 = $19.length, key, handler; $18 < $20; $18++){
			key = $19[$18];handler = $2[key];
			server.context[key] = handler;
		};
		
		const cmdEval = server.eval;
		
		const sessionId = String(new Date().valueOf());
		
		server.eval = function(cmd,context,file,cb) {
			
			const compiledCode = $3.default.code(cmd,sessionId).get();
			
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
		
		server.input.on('keypress',function(chunk,key) {
			
			if (key.name == 'tab' && key.shift) { return server.write('\t') };
		});
		
		return server;
	}
};
exports.default = ImbaRepl;
