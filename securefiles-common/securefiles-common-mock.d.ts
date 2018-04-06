export declare class SecureFileHelpers {
    constructor();
    downloadSecureFile(secureFileId: string): Promise<string>;
    deleteSecureFile(secureFileId: string): void;
}
