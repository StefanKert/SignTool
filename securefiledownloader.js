"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Q = require("q");
const tl = require("vsts-task-lib/task");
const vsts = require("vso-node-api/WebApi");
class SecureFileDownloader {
    constructor() {
        let serverUrl = tl.getVariable("System.TeamFoundationCollectionUri");
        let serverCreds = tl.getEndpointAuthorizationParameter("SYSTEMVSSCONNECTION", "ACCESSTOKEN", false);
        let authHandler = vsts.getPersonalAccessTokenHandler(serverCreds);
        this.serverConnection = new vsts.WebApi(serverUrl, authHandler);
    }
    downloadSecureFile(secureFileId) {
        return __awaiter(this, void 0, void 0, function* () {
            let tempDownloadPath = this.getSecureFileTempDownloadPath(secureFileId);
            tl.debug("Downloading secure file contents to: " + tempDownloadPath);
            let file = fs.createWriteStream(tempDownloadPath);
            let taskAgentApi = yield this.serverConnection.getTaskAgentApi();
            var secureFile = yield taskAgentApi.downloadSecureFile(tl.getVariable("SYSTEM.TEAMPROJECT"), secureFileId, tl.getSecureFileTicket(secureFileId), false);
            let stream = secureFile.pipe(file);
            let defer = Q.defer();
            stream.on("finish", () => {
                defer.resolve();
            });
            yield defer.promise;
            tl.debug("Downloaded secure file contents to: " + tempDownloadPath);
            return tempDownloadPath;
        });
    }
    deleteSecureFile(secureFileId) {
        let tempDownloadPath = this.getSecureFileTempDownloadPath(secureFileId);
        if (tl.exist(tempDownloadPath)) {
            tl.debug("Deleting secure file at: " + tempDownloadPath);
            tl.rmRF(tempDownloadPath);
        }
    }
    getSecureFileTempDownloadPath(secureFileId) {
        let fileName = tl.getSecureFileName(secureFileId);
        let tempDownloadPath = tl.resolve(tl.getVariable("Agent.TempDirectory"), fileName);
        return tempDownloadPath;
    }
}
exports.SecureFileDownloader = SecureFileDownloader;
//# sourceMappingURL=securefiledownloader.js.map