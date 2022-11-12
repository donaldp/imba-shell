export default UpdateNotifier;
declare class UpdateNotifier {
    package: string;
    directory: string;

    shouldFetchLatestVersion(): number | true;

    compareVersion(latestVersion: string): boolean | 0;

    fetchLatestVersion(): string | null;

    storeVersion(data: string): void;

    check(callback?: Function | boolean): void;
}
