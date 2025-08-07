const fs = require("fs");
const path = require("path");

function fixCJSImports(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  // Replace relative require statements to use .cjs extension
  const fixedContent = content.replace(
    /require\(['"](\.\/.+?)['"]?\)/g,
    (match, importPath) => {
      // Only add .cjs if there's no extension already and it's a relative path
      if (!path.extname(importPath)) {
        return match.replace(importPath, importPath + ".cjs");
      }
      return match;
    }
  );

  if (content !== fixedContent) {
    fs.writeFileSync(filePath, fixedContent);
    console.log(`Fixed CJS imports in: ${filePath}`);
  }
}

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (path.extname(file) === ".cjs") {
      fixCJSImports(filePath);
    }
  });
}

// Process the CJS directory
const cjsDir = path.join(__dirname, "dist", "cjs");
if (fs.existsSync(cjsDir)) {
  console.log("Fixing CJS imports...");
  processDirectory(cjsDir);
} else {
  console.log("CJS directory not found");
}
