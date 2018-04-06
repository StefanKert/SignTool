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
const tl = require("vsts-task-lib/task");
class SecureFileHelpers {
    constructor() {
        tl.debug('Mock SecureFileHelpers constructor');
    }
    downloadSecureFile(secureFileId) {
        return __awaiter(this, void 0, void 0, function* () {
            tl.debug('Mock downloadSecureFile with id = ' + secureFileId);
            let fileName = secureFileId + '.filename';
            let tempDownloadPath = '/build/temp/' + fileName;
            return tempDownloadPath;
        });
    }
    deleteSecureFile(secureFileId) {
        tl.debug('Mock deleteSecureFile with id = ' + secureFileId);
    }
}
exports.SecureFileHelpers = SecureFileHelpers;
