const { ImbaCompiler } = require('../lib');

describe('src/ImbaCompiler', () => {

	it('should expect code to be of type string.', () => {
		expect(() => {
			ImbaCompiler.code(123).get()
		}).toThrow(TypeError);
	});

	it('should compile Imba to JavaScript.', () => {
		const sessionId = String(new Date().valueOf());

		expect(ImbaCompiler.code('console.log "Hello World!"', sessionId).get()).toContain('console.log("Hello World!")');
	});

	test.skip('should compile Imba ESM script to CommonJS.', () => {
		const sessionId = String(new Date().valueOf());

		expect(ImbaCompiler.code('import imba from "imba"', sessionId).get()).toContain('requireDefault$__(require(\"imba\"/*$path$*/))');
	});

})
