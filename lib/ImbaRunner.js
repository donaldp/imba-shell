function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$child_processφ = require('child_process'/*$path$*/);
var _$fsφ = requireDefault$__(require('fs'/*$path$*/));
var _$ImbaMissingExceptionφ = requireDefault$__(require('./Error/ImbaMissingException'/*$path$*/));
var _$pathφ = requireDefault$__(require('path'/*$path$*/));

class ImbaRunner {
	
	
	static get imba(){
		
		const local = _$pathφ.default.join(process.cwd(),'node_modules','.bin','imbac');
		const onboard = _$pathφ.default.join(__dirname,'..','node_modules','.bin','imbac');
		
		return _$fsφ.default.existsSync(local) ? local : onboard;
	}
	
	static instance(){
		
		if (!(_$fsφ.default.existsSync(this.imba))) {
			
			throw new _$ImbaMissingExceptionφ.default((`Imba not found at $` + (this.imba)));
		};
		
		return this.imba;
	}
	
	static get version(){
		
		return _$child_processφ.execSync(("" + this.instance() + " -v")).toString().trim();
	}
};
exports.default = ImbaRunner;
