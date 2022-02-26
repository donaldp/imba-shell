export var __esModule: boolean;
export default Command;
declare class Command {
    args: string[];
    watch: any;
    get isRuntime(): boolean;
    enableWatcher(): string[];
    printVersion(): void;
    displayHelp(): void;
    invalidCommand(): never;
    run(): any;
    exec(): void;
    createFallbackScript(): string;
    handle(): any;
    [Ψ__init__]($$?: any): void;
}
declare const Ψ__init__: unique symbol;
