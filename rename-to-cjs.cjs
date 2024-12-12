const fs = require("fs");
const path = require("path");

const directory = "./dist/cjs"; // Adjust this to your output directory

function renameJsToCjs(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      const filePath = path.join(dir, file);

      fs.stat(filePath, (err, stats) => {
        if (err) throw err;

        if (stats.isDirectory()) {
          renameJsToCjs(filePath); // Recurse into subdirectories
        } else if (path.extname(file) === ".js") {
          const newPath = path.join(dir, `${path.basename(file, ".js")}.cjs`);
          fs.rename(filePath, newPath, (err) => {
            if (err) throw err;
            console.log(`Renamed: ${file} -> ${path.basename(newPath)}`);
          });
        }
      });
    });
  });
}

renameJsToCjs(directory);
