const { ImbaRepl } = require('../dist');

describe('src/ImbaRepl', () => {

	it('should create a repl instance.', () => {
		expect(new ImbaRepl()).toBeInstanceOf(ImbaRepl);

		expect(new ImbaRepl('imba', 'imba> ')).toBeInstanceOf(ImbaRepl);

		expect(new ImbaRepl('imba', 'imba> ', '.imba_history')).toBeInstanceOf(ImbaRepl);
	});

	it('should expect repl language to be of type string.', () => {
		expect(() => {
			new ImbaRepl([])
		}).toThrow(TypeError);
	});

	it('should expect repl language to be "imba" or "typescript".', () => {
		expect(() => {
			new ImbaRepl('random')
		}).toThrow(Error);
	});

	it('should expect repl prompt to be of type string.', () => {
		expect(() => {
			new ImbaRepl(null, [])
		}).toThrow(TypeError);
	});

	it('should expect repl options to be of type object.', () => {
		expect(async () => {
			await new ImbaRepl().run('fail');
		}).rejects.toThrowError(new TypeError('Expected repl options to be an Object.'));
	});

	it('should expect repl callbacks to be valid.', () => {
		expect(() => {
			new ImbaRepl().registerCallback('invalid callback')
		}).toThrow(TypeError);
	});

})
