export def exit
	console.log 'Exit: Goodbye'

	process.exit!

export def clear
	process.stdout.write('\u001B[2J\u001B[0;0f')

	return
