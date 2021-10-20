Object.defineProperty(exports, "__esModule", {value: true});

/*body*/
function exit(){
	
	console.log('Exit: Goodbye');
	
	return process.exit();
};
exports.exit = exit;

function clear(){
	
	process.stdout.write('\u001B[2J\u001B[0;0f');
	
	return;
};
exports.clear = clear;
