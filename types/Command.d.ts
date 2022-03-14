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
    [$10]($$?: any): void;
}
declare const $10: unique symbol;
