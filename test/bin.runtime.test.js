const { execSync } = require('child_process');

describe('bin/Runtime', () => {

	it('should return Imba Shell version.', () => {
		expect(execSync('./bin/runtime --version').toString()).toContain('Imba Shell v');
		expect(execSync('./bin/runtime -v').toString()).toContain('Imba Shell v');
	});

	it('should return Imba Shell help.', () => {
		expect(execSync('./bin/runtime --help').toString()).toContain('Usage:');
		expect(execSync('./bin/runtime -h').toString()).toContain('Usage:');
	});

	it("should output error if option doesn't exist.", () => {
		expect(() => {
			try {
				execSync('./bin/runtime --random');
			} catch {
				throw new Error;
			}
		}).toThrowError();
	});

	it('should execute Imba script.', () => {
		expect(execSync('./bin/runtime ./test/bin/hello.imba').toString()).toContain('Hello stranger');
		expect(execSync('./bin/runtime ./test/bin/hello.imba Donald').toString()).toContain('Hello Donald');
	});

	it('should output help if script name is missing.', () => {
		expect(execSync('./bin/runtime').toString()).toContain('Usage:');
	});

	it("should output error if script doesn't exist.", () => {
		expect(() => {
			try {
				execSync('./bin/runtime ./random.imba');
			} catch {
				throw new Error;
			}
		}).toThrowError();
	});

})
