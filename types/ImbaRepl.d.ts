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
    update: any;
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
    @param {Function} callback
    */
    shouldUpdate(callback?: Function): ImbaRepl;
    /**
    @param {Object} options
    */
    run(options?: any): Promise<any>;
    [$9]($$?: any): void;
}
declare const $9: unique symbol;
