export var __esModule: boolean;
export default UpdateNotifier;
declare class UpdateNotifier {
    package: any;
    directory: any;
    shouldFetchLatestVersion(): number | true;
    /**
    @param {String} latestVersion
    */
    compareVersion(latestVersion: string): boolean | 0;
    fetchLatestVersion(): any;
    /**
    @param {String} data
    */
    storeVersion(data: string): any;
    /**
    @param {Function|Boolean} callback
    */
    check(callback?: Function | boolean): any;
    [Ψ__init__]($$?: any): void;
}
declare const Ψ__init__: unique symbol;
