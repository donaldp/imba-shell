const { ImbaCompiler } = require('../lib');

describe('src/ImbaCompiler', () => {

	it('should expect code to be of type string.', () => {
		expect(() => {
			ImbaCompiler.code(123).get()
		}).toThrow(TypeError);
	});

	it('should compile Imba to JavaScript.', () => {
		expect(ImbaCompiler.code('console.log "Hello World!"').get()).toContain('console.log("Hello World!")');
	});

})
