export default TypeScriptCompiler;

declare class TypeScriptCompiler {
    code: string;
    sessionId: string;

    static code(code: string, sessionId: string): TypeScriptCompiler;

    constructor(code: string, sessionId: string);

    get(): string;
}
