const { execSync } = require('child_process');

describe('bin/Runtime', () => {

	it('should run repl.', () => {
		expect(execSync('./bin/repl').toString()).toContain('>>>')
	})

	it('should return Imba Shell version.', () => {
		expect(execSync('./bin/repl --version').toString()).toContain('Imba Shell v');
		expect(execSync('./bin/repl -v').toString()).toContain('Imba Shell v');
	});

	it('should return Imba Shell help.', () => {
		expect(execSync('./bin/repl --help').toString()).toContain('Usage:');
		expect(execSync('./bin/repl -h').toString()).toContain('Usage:');
	});

	it("should output error if option doesn't exist.", () => {
		expect(() => {
			try {
				execSync('./bin/repl --random');
			} catch {
				throw new Error;
			}
		}).toThrowError();
	});

})
