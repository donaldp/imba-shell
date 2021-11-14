/// <reference types="node" />
export var __esModule: boolean;
export default Command;
declare class Command {
    args: string[];
    get isRuntime(): boolean;
    printVersion(): void;
    displayHelp(): void;
    invalidCommand(): never;
    run(): any;
    exec(): _$child_processφ.ChildProcess;
    handle(): any;
    [Ψ__init__]($$?: any): void;
}
import _$child_processφ = require("child_process");
declare const Ψ__init__: unique symbol;
