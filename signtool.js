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
const path = require("path");
const tl = require("vsts-task-lib/task");
const exec = require("child_process");
const securefiledownloader_1 = require("./securefiledownloader");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        let secureFileId;
        let signCertPassword;
        let filePath;
        let secureFileHelpers;
        let secureFilePath;
        try {
            tl.setResourcePath(path.join(__dirname, "task.json"));
            secureFileId = tl.getInput("secureFileId", true);
            signCertPassword = tl.getInput("signCertPassword", true);
            filePath = tl.getInput("filePath", true);
            console.log("Downloadig secure file " + secureFileId);
            secureFileHelpers = new securefiledownloader_1.SecureFileDownloader();
            secureFilePath = yield secureFileHelpers.downloadSecureFile(secureFileId);
            console.log("Signing file");
            var exePath = path.resolve(__dirname, "./signtool.exe");
            console.log("Executing signtool at " + exePath);
            exec.execFile(exePath, [
                "sign",
                "/fd", "SHA256",
                "/t", "http://timestamp.digicert.com",
                "/f", secureFilePath,
                "/p", signCertPassword,
                filePath
            ], (err, data) => {
                if (err) {
                    console.error(err);
                    tl.setResult(tl.TaskResult.Failed, err.message);
                }
                else {
                    console.log("Successfully signed file " +
                        filePath +
                        " with certificate in " +
                        secureFilePath);
                }
            });
        }
        catch (err) {
            console.error(err);
            tl.setResult(tl.TaskResult.Failed, err);
        }
        finally {
            secureFileHelpers.deleteSecureFile(secureFilePath);
        }
    });
}
run();
//# sourceMappingURL=signtool.js.map