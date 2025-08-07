const fs = require("fs");
const path = require("path");

function fixESMImports(filePath) {
  const content = fs.readFileSync(filePath, "utf8");

  // Replace relative imports without extensions with .js extensions
  const fixedContent = content
    .replace(/from ['"](\.\/.+?)['"];/g, (match, importPath) => {
      // Only add .js if there's no extension already
      if (!path.extname(importPath)) {
        return match.replace(importPath, importPath + ".js");
      }
      return match;
    })
    .replace(
      /export \{[^}]+\} from ['"](\.\/.+?)['"];/g,
      (match, importPath) => {
        // Only add .js if there's no extension already
        if (!path.extname(importPath)) {
          return match.replace(importPath, importPath + ".js");
        }
        return match;
      }
    );

  if (content !== fixedContent) {
    fs.writeFileSync(filePath, fixedContent);
    console.log(`Fixed ESM imports in: ${filePath}`);
  }
}

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (path.extname(file) === ".js") {
      fixESMImports(filePath);
    }
  });
}

// Process the ESM directory
const esmDir = path.join(__dirname, "dist", "esm");
if (fs.existsSync(esmDir)) {
  console.log("Fixing ESM imports...");
  processDirectory(esmDir);
} else {
  console.log("ESM directory not found");
}
