export default class ImbaCompiler {
    /**
    @param {String} code
    */
    static code(code: string): ImbaCompiler;
    /**
    @param {String} code
    */
    constructor(code: string);
    code: string;
    get(): string;
    [Ψ__init__]($$?: any): void;
}
declare const Ψ__init__: unique symbol;
export {};
