const { ImbaCompiler } = require('../dist/Compilers');

describe('src/Compilers/ImbaCompiler', () => {

	it('should expect code to be of type string.', () => {
		expect(() => {
			ImbaCompiler.code(123).get()
		}).toThrow(TypeError);
	});

	it('should compile Imba to JavaScript.', () => {
		const sessionId = String(new Date().valueOf());

		expect(ImbaCompiler.code('console.log "Hello World!"', sessionId).get()).toContain('console.log("Hello World!")');
	});

})
