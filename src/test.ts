import type { Directory } from "./components/sidebarFileManager/utils/fileManager";

/**
 * Type
 * 0 = file
 * 1 = dir
 */
const editorSidebarDataFormat: Directory = {
  id: "",
  parentId: "",
  depth: 0,
  dirs: [
    {
      id: "",
      parentId: "",
      depth: 1,
      dirs: [],
      files: [],
      name: "name",
      type: 0,
    },
  ],
  files: [
    {
      id: "",
      parentId: "",
      depth: 0,
      name: "name",
      type: 0,
      content: "",
    },
  ],
  name: "name",
  type: 0,
};

const webContainerDataFormat = {
  "package.json": {
    file: {
      contents: JSON.stringify({
        name: "webcontainer-app",
        type: "module",
        scripts: { start: "node index.js" },
      }),
    },
  },
  "index.js": {
    file: {
      contents: `console.log('Hello from WebContainer!')`,
    },
  },
  src: {
    directory: {
      files: {
        "main.js": {
          file: {
            contents: `console.log('Inside src/main.js')`,
          },
        },
      },
    },
  },
};
