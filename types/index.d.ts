declare const _exports: any;
export = _exports;
export var Command: {
    new (): {
        args: string[];
        watch: any;
        readonly isRuntime: boolean;
        enableWatcher(): string[];
        printVersion(): void;
        displayHelp(): void;
        invalidCommand(): never;
        run(): any;
        exec(): void;
        createFallbackScript(): string;
        handle(): any;
    };
};
export var ImbaRepl: {
    new (language?: string, prompt?: string, historyPath?: any): {
        ctxCallbacks: any;
        cmdCallbacks: any;
        update: any;
        language: string;
        prompt: string;
        historyPath: any;
        registerCallback(callback: any): any;
        registerCommand(name2: any, callback: any): any;
        shouldUpdate(callback?: any): any;
        run(options?: {}): Promise<any>;
    };
};
export var UpdateNotifier: {
    new (): {
        package: any;
        directory: any;
        shouldFetchLatestVersion(): number | true;
        compareVersion(latestVersion: any): boolean | 0;
        fetchLatestVersion(): any;
        storeVersion(data: any): any;
        check(callback?: any): any;
    };
};
