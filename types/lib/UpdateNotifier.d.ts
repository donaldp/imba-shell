export var __esModule: boolean;
export default UpdateNotifier;
declare class UpdateNotifier {
    package: string;
    directory: any;
    /**
    @param {String} latestVersion
    */
    compareVersion(latestVersion: string): any;
    fetchLatestVersion(): any;
    /**
    @param {String} data
    */
    schedule(data: string): any;
    /**
    @param {Function} callback
    */
    check(callback?: Function): any;
    [Ψ__init__]($$?: any): void;
}
declare const Ψ__init__: unique symbol;
