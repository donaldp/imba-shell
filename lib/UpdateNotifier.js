function requireDefault$__(obj){
	return obj && obj.__esModule ? obj : { default: obj };
};
const $6 = Symbol.for('#__init__'), $9 = Symbol.for('#__initor__'), $10 = Symbol.for('#__inited__'), $7 = Symbol.for('#__hooks__');
Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
var $1 = require('../package.json'/*$path$*/);
var $2 = requireDefault$__(require('fs'/*$path$*/));
var $3 = requireDefault$__(require('https'/*$path$*/));
var $4 = requireDefault$__(require('os'/*$path$*/));
var $5 = requireDefault$__(require('path'/*$path$*/));
class UpdateNotifier {
	[$6]($$ = null){
		var $8;
		this.package = ($$ && ($8 = $$.package) !== undefined) ? ($8) : (("https://registry.npmjs.org/-/package/" + $1.name + "/dist-tags"));
		this.directory = ($$ && ($8 = $$.directory) !== undefined) ? ($8) : $5.default.join($4.default.homedir(),("." + $1.name));
		
	}
	constructor(){
		this[$6]();
		if (!($2.default.existsSync(this.directory))) { $2.default.mkdirSync(this.directory) };
		
		if (this.shouldFetchLatestVersion()) {
			
			this.fetchLatestVersion();
		};
	}
	
	shouldFetchLatestVersion(){
		
		const file = $5.default.join(this.directory,'latest.json');
		
		if (!($2.default.existsSync(file))) { return true };
		
		const fileDate = $2.default.statSync(file).mtime;
		const currentDate = new Date;
		
		const _FILE_DATE = Date.UTC(fileDate.getFullYear(),fileDate.getMonth(),fileDate.getDate());
		const _CURRENT_DATE = Date.UTC(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate());
		const _MS_PER_DAY = 1000 * 60 * 60 * 24;
		
		const shouldRefresh = Math.floor((_CURRENT_DATE - _FILE_DATE) / _MS_PER_DAY > 0);
		
		if (shouldRefresh) { $2.default.unlinkSync(file) };
		
		return shouldRefresh;
	}
	
	/**
	@param {String} latestVersion
	*/
	compareVersion(latestVersion){
		
		if ($1.version.trim() == latestVersion.trim()) { return 0 };
		
		return latestVersion.localeCompare($1.version) == 1;
	}
	
	fetchLatestVersion(){
		var self = this;
		
		const request = $3.default.get(this.package);
		
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
		
		const latestPath = $5.default.join(this.directory,'latest.json');
		
		return $2.default.writeFileSync(latestPath,data);
	}
	
	/**
	@param {Function|Boolean} callback
	*/
	check(callback = null){
		
		if (!($2.default.existsSync($5.default.join(this.directory,'latest.json')))) { return };
		
		const response = JSON.parse($2.default.readFileSync($5.default.join(this.directory,'latest.json')).toString());
		
		if (!(this.compareVersion(response.latest))) { return };
		
		if (callback && typeof callback == 'function') {
			
			response.current = $1.version;
			
			return callback(response);
		};
		
		const repeat = function(/**@type {String}*/char$) { return char$.repeat($1.name.length * 2); };
		
		console.log('┌─────────────────────────────────────────────────────' + repeat('─') + '─┐');
		console.log('│                                                      ' + repeat(' ') + '│');
		console.log(("│  New version available: v" + (response.latest) + " (current: v" + $1.version + ")     ") + repeat(' ') + '│');
		console.log(("│  Run \u001B[32mnpm install -g " + $1.name + "\u001B[0m or \u001B[32myarn global add " + $1.name + "\u001B[0m to update!  │"));
		console.log('│                                                      ' + repeat(' ') + '│');
		return console.log('└──────────────────────────────────────────────────────' + repeat('─') + '┘');
	}
};
exports.default = UpdateNotifier;
