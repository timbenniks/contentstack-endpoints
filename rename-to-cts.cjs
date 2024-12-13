const fs = require("fs");
const path = require("path");

const directory = "./dist/types";
const targetFile = "index.d.ts";
const newFile = "index.d.cts";

function copyIndexDts(dir) {
  const sourcePath = path.join(dir, targetFile);
  const destPath = path.join(dir, newFile);

  fs.access(sourcePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`${targetFile} not found in ${dir}`);
      return;
    }

    fs.copyFile(sourcePath, destPath, (err) => {
      if (err) {
        console.error(`Error copying file: ${err}`);
        return;
      }
      console.log(`Created: ${newFile}`);
    });
  });
}

copyIndexDts(directory);
