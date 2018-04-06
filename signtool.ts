import path = require("path");
import secureFilesCommon = require("securefiles-common/securefiles-common");
import tl = require("vsts-task-lib/task");
import exec = require("child_process");

async function run() {
  let secureFileId: string;
  let signCertPassword: string;
  let filePath: string;
  let secureFileHelpers: secureFilesCommon.SecureFileHelpers;

  try {
    tl.setResourcePath(path.join(__dirname, "task.json"));

    // download decrypted contents
    secureFileId = tl.getInput("secureFileId", true);
    signCertPassword = tl.getInput("signCertPassword", true);
    filePath = tl.getInput("filePath", true);

    console.log("Downloadig secure file " + secureFileId);
    secureFileHelpers = new secureFilesCommon.SecureFileHelpers();
    let secureFilePath: string = await secureFileHelpers.downloadSecureFile(
      secureFileId
    );

    console.log("Signing file");
    exec.execFile(
      ".signtool.exe",
      [
        "sign",
        "/fd SHA256",
        "/t http://timestamp.digicert.com",
        "/f " + secureFilePath,
        "/p " + signCertPassword,
        filePath
      ],
      function(err, data) {
        if (err) {
          tl.setResult(tl.TaskResult.Failed, err.message);
        } else {
          console.log(
            "Successfully signed file " +
              filePath +
              " with certificate in " +
              secureFilePath
          );
        }
      }
    );
  } catch (err) {
    tl.setResult(tl.TaskResult.Failed, err);
  }
}

run();
