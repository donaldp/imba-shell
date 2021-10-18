const { ImbaRunner } = require('../lib');

describe('src/ImbaRunner', () => {

	it('should return imba version.', () => {
		expect(ImbaRunner.version).toContain('.');
	});

	it('should return imba instance path.', () => {
		expect(ImbaRunner.instance()).toContain('node_modules');
	});

})
