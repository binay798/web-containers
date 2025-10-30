// const fs = require("fs/promises");
import fs from "fs/promises";
import path from "path";

function generateId() {
  return Math.random().toString(36).substring(2, 11);
}
const rootDirectory = {
  id: generateId(),
  type: 1,
  name: "",
  parentId: "",
  depth: 0,
  absolutePath: "",
  dirs: [],
  files: [],
};

const excludedFolders = ["node_modules", ".git"];
async function readDirectory(rootDir, absPath, aliasRootPath = "", depth = -1) {
  const folderInfo = await fs.readdir(absPath);
  const filteredFolderInfo = folderInfo?.filter(
    (el) => !excludedFolders.includes(el)
  );
  for await (const el of filteredFolderInfo) {
    const stat = await fs.stat(path.join(absPath, el));
    if (stat.isFile()) {
      const content = await fs.readFile(path.join(absPath, el), "utf-8");
      const generatedFileObj = {
        id: generateId(),
        type: 0,
        name: el,
        parentId: rootDir.id,
        depth: depth + 1,
        content,
        absolutePath: path.join(aliasRootPath, el),
      };
      rootDir.files.push(generatedFileObj);

      //   console.log(generatedFileObj);
    } else {
      const generatedFileObj = {
        id: generateId(),
        type: 1,
        name: el,
        parentId: rootDir.id,
        depth: depth + 1,
        absolutePath: path.join(aliasRootPath, el),
        dirs: [],
        files: [],
      };
      rootDir.dirs.push(generatedFileObj);
      await readDirectory(
        generatedFileObj,
        path.join(absPath, el),
        path.join(aliasRootPath, el),
        depth + 1
      );
    }
  }
}

const myDirPath =
  "/Users/binay6014/Projects/my-projects/web-containers/web-container-templates/vanilla-js";

readDirectory(rootDirectory, myDirPath).then(async () => {
  const jsonedData = JSON.stringify(rootDirectory);

  await fs.writeFile(path.join(process.cwd(), "result.json"), jsonedData);
});
