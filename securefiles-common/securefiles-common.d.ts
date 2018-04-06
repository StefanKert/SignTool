import vsts = require('vso-node-api');
export declare class SecureFileHelpers {
    serverConnection: vsts.WebApi;
    constructor();
    /**
     * Download secure file contents to a temporary location for the build
     * @param secureFileId
     */
    downloadSecureFile(secureFileId: string): Promise<string>;
    /**
     * Delete secure file from the temporary location for the build
     * @param secureFileId
     */
    deleteSecureFile(secureFileId: string): void;
    /**
     * Returns the temporary download location for the secure file
     * @param secureFileId
     */
    getSecureFileTempDownloadPath(secureFileId: string): string;
}
