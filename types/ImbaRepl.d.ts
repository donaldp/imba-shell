export default ImbaRepl;
declare class ImbaRepl {
    ctxCallbacks: Array<Function>;
    cmdCallbacks: Array<Function>;
    update: boolean|Function;
    language: string;
    prompt: string;
    historyPath: string;

    constructor(language?: string, prompt?: string, historyPath?: string);

    registerCallback(callback: Function): ImbaRepl;

    registerCommand(name: string, callback: Function): ImbaRepl;

    shouldUpdate(callback?: Function): ImbaRepl;

    run(options?: object): Promise<any>;
}
