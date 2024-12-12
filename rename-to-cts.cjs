const fs = require("fs");
const path = require("path");

const directory = "./dist/types";

function renameTsToCts(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const filePath = path.join(dir, file);

      fs.stat(filePath, (err, stats) => {
        if (err) throw err;

        if (stats.isDirectory()) {
          renameTsToCts(filePath); // Recurse into subdirectories
        } else if (path.extname(file) === ".ts" && !file.endsWith(".d.ts")) {
          const newPath = path.join(dir, `${path.basename(file, ".ts")}.cts`);
          fs.rename(filePath, newPath, (err) => {
            if (err) throw err;
            console.log(`Renamed: ${file} -> ${path.basename(newPath)}`);
          });
        }
      });
    });
  });
}

renameTsToCts(directory);
