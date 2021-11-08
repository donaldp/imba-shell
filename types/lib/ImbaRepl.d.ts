export var __esModule: boolean;
export default ImbaRepl;
declare class ImbaRepl {
    /**
    @param {String} prompt
    @param {String|null} historyPath
    */
    constructor(prompt?: string, historyPath?: string | null);
    ctxCallbacks: any;
    cmdCallbacks: any;
    prompt: string;
    historyPath: string;
    /**
    @param {Function} callback
    */
    registerCallback(callback: Function): ImbaRepl;
    /**
    @param {String} name
    @param {Function} callback
    */
    registerCommand(name: string, callback: Function): ImbaRepl;
    /**
    @param {Object} options
    */
    run(options?: any): Promise<any>;
    [Ψ__init__]($$?: any): void;
}
declare const Ψ__init__: unique symbol;
