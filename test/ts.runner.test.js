const { TypeScriptRunner } = require('../dist/Runners')

describe('src/Runners/TypeScriptRunner', () => {

	it('should return typescript version.', () => {
		expect(TypeScriptRunner.version).toContain('.');
	});

    it('should return typescript instance path.', () => {
		expect(TypeScriptRunner.instance()).toContain('node_modules');
	});

})