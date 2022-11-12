export default ImbaCompiler;

declare class ImbaCompiler {
    code: string;
    sessionId: string;

    static code(code: string, sessionId: string): ImbaCompiler;

    constructor(code: string, sessionId: string);

    get(): string;
}
