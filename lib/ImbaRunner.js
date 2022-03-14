function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('child_process'/*$path$*/);
var $2 = requireDefault$__(require('fs'/*$path$*/));
var $3 = requireDefault$__(require('./Error/ImbaMissingException'/*$path$*/));
var $4 = requireDefault$__(require('path'/*$path$*/));

class ImbaRunner {
	
	
	static get ext(){
		
		return (process.platform === 'win32') ? '.cmd' : '';
	}
	
	static get imba(){
		
		const local = $4.default.join(process.cwd(),'node_modules','.bin','imba');
		const onboard = $4.default.join(__dirname,'..','node_modules','.bin','imba');
		
		return $2.default.existsSync(local) ? local : onboard;
	}
	
	/**
	@param {Boolean} compiler
	*/
	static instance(compiler = false){
		
		const file = this.imba + (compiler ? 'c' : '') + this.ext;
		
		if (!($2.default.existsSync(file))) {
			
			throw new $3.default((`Imba not found at $` + file));
		};
		
		return file;
	}
	
	static get version(){
		
		return $1.execSync(("" + this.instance(true) + " -v")).toString().trim();
	}
};
exports.default = ImbaRunner;
