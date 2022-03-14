export var __esModule: boolean;
export default ImbaRunner;
declare class ImbaRunner {
    static get ext(): "" | ".cmd";
    static get imba(): any;
    /**
    @param {Boolean} compiler
    */
    static instance(compiler?: boolean): string;
    static get version(): string;
}
