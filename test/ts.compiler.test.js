const { TypeScriptCompiler } = require('../dist/Compilers');

describe('src/Compilers/TypeScriptCompiler', () => {

	it('should expect code to be of type string.', () => {
		expect(() => {
			TypeScriptCompiler.code(123).get()
		}).toThrow(TypeError);
	});

	it('should compile typescript to javascript.', () => {
		const sessionId = String(new Date().valueOf());

		expect(TypeScriptCompiler.code('const name: string = "Donald";', sessionId).get()).toContain('const name = "Donald"');
	});

})
