function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const Ψ__init__ = Symbol.for('#__init__'), Ψ__initor__ = Symbol.for('#__initor__'), Ψ__inited__ = Symbol.for('#__inited__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var _$jsonφ = require('../package.json'/*$path$*/);
var _$fsφ = requireDefault$__(require('fs'/*$path$*/));
var _$httpsφ = requireDefault$__(require('https'/*$path$*/));
var _$osφ = requireDefault$__(require('os'/*$path$*/));
var _$pathφ = requireDefault$__(require('path'/*$path$*/));
class UpdateNotifier {
	[Ψ__init__]($$ = null){
		var vφ;
		this.package = ($$ && (vφ = $$.package) !== undefined) ? (vφ) : (("https://registry.npmjs.org/-/package/" + _$jsonφ.name + "/dist-tags"));
		this.directory = ($$ && (vφ = $$.directory) !== undefined) ? (vφ) : _$pathφ.default.join(_$osφ.default.homedir(),("." + _$jsonφ.name));
		
	}
	constructor(){
		this[Ψ__init__]();
		if (!(_$fsφ.default.existsSync(this.directory))) { _$fsφ.default.mkdirSync(this.directory) };
		
		if (this.shouldFetchLatestVersion()) {
			
			this.fetchLatestVersion();
		};
	}
	
	shouldFetchLatestVersion(){
		
		const file = _$pathφ.default.join(this.directory,'latest.json');
		
		if (!(_$fsφ.default.existsSync(file))) { return true };
		
		const fileDate = _$fsφ.default.statSync(file).mtime;
		const currentDate = new Date;
		
		const _FILE_DATE = Date.UTC(fileDate.getFullYear(),fileDate.getMonth(),fileDate.getDate());
		const _CURRENT_DATE = Date.UTC(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate());
		const _MS_PER_DAY = 1000 * 60 * 60 * 24;
		
		const shouldRefresh = Math.floor((_CURRENT_DATE - _FILE_DATE) / _MS_PER_DAY > 0);
		
		if (shouldRefresh) { _$fsφ.default.unlinkSync(file) };
		
		return shouldRefresh;
	}
	
	/**
	@param {String} latestVersion
	*/
	compareVersion(latestVersion){
		
		if (_$jsonφ.version.trim() == latestVersion.trim()) { return 0 };
		
		return latestVersion.localeCompare(_$jsonφ.version) == 1;
	}
	
	fetchLatestVersion(){
		var self = this;
		
		const request = _$httpsφ.default.get(this.package);
		
		request.on('response',function(response) {
			
			if (response.statusCode !== 200) { return };
			
			let data = '';
			
			response.on('data',function(chunk) { return data += chunk; });
			
			return response.on('end',function() { return self.storeVersion(data); });
		});
		
		request.end();
		
		return request.on('error',function() { return; });
	}
	
	/**
	@param {String} data
	*/
	storeVersion(data){
		
		const latestPath = _$pathφ.default.join(this.directory,'latest.json');
		
		return _$fsφ.default.writeFileSync(latestPath,data);
	}
	
	/**
	@param {Function|Boolean} callback
	*/
	check(callback = null){
		
		if (!(_$fsφ.default.existsSync(_$pathφ.default.join(this.directory,'latest.json')))) { return };
		
		const response = JSON.parse(_$fsφ.default.readFileSync(_$pathφ.default.join(this.directory,'latest.json')).toString());
		
		if (!(this.compareVersion(response.latest))) { return };
		
		if (callback && typeof callback == 'function') {
			
			response.current = _$jsonφ.version;
			
			return callback(response);
		};
		
		const repeat = function(/**@type {String}*/char$) { return char$.repeat(_$jsonφ.name.length * 2); };
		
		console.log('┌─────────────────────────────────────────────────────' + repeat('─') + '─┐');
		console.log('│                                                      ' + repeat(' ') + '|');
		console.log(("│  New version available: v" + (response.latest) + " (current: v" + _$jsonφ.version + ")     ") + repeat(' ') + '|');
		console.log(("│  Run \u001B[32mnpm install -g " + _$jsonφ.name + "\u001B[0m or \u001B[32myarn global add " + _$jsonφ.name + "\u001B[0m to update!  |"));
		console.log('|                                                      ' + repeat(' ') + '|');
		return console.log('└──────────────────────────────────────────────────────' + repeat('─') + '┘');
	}
};
exports.default = UpdateNotifier;
