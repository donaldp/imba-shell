import { TypeScriptMissingException } from '../Errors'

declare class TypeScriptRunner {
    static get tsc(): string;

    /**
     * @throws {TypeScriptMissingException}
     */
    static instance(): string;

    static get version(): string;
}

export default TypeScriptRunner