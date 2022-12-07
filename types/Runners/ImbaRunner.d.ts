export default ImbaRunner;
declare class ImbaRunner {
    static get ext(): "" | ".cmd";

    static get imba(): string;

    static instance(compiler?: boolean): string;

    static get version(): string;
}
