export default Command;

declare class Command {
    args: string[];
    watch: boolean;
    get isRuntime(): boolean;
    enableWatcher(): string[];
    printVersion(): void;
    displayHelp(): void;
    invalidCommand(): never;
    run(): any;
    exec(): void;
    createFallbackScript(): string;
    handle(...args: any[]): void;
}
