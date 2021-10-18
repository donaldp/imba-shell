const { ImbaRunner } = require('../lib');

describe('src/ImbaRunner', () => {

	it('should return imba version.', () => {
		expect(ImbaRunner.version).toContain('.');
	});

	it('should return imba path instance.', () => {
		expect(ImbaRunner.instance()).toContain('node_modules');
	});

})
