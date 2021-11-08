export var __esModule: boolean;
export default ImbaCompiler;
declare class ImbaCompiler {
    /**
    @param {String} code
    @param {String} sessionId
    */
    static code(code: string, sessionId: string): ImbaCompiler;
    /**
    @param {String} code
    @param {String} sessionId
    */
    constructor(code: string, sessionId: string);
    code: string;
    sessionId: string;
    get(): string;
    [Ψ__init__]($$?: any): void;
}
declare const Ψ__init__: unique symbol;
