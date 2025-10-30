import type { FileSystemTree } from "../../webcontainer/webcontainer.types";
import { Type, type Directory, type File } from "./fileManager";

// WebContainer data format types
type FileNode = {
  file: {
    contents: string;
  };
};

type DirectoryNode = {
  directory: {
    [name: string]: FileNode | DirectoryNode;
  };
};

/**
 * Generates a unique ID for files and directories
 */
function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

/**
 * Checks if a node is a FileNode
 */
function isFileNode(node: FileNode | DirectoryNode): node is FileNode {
  return "file" in node;
}

/**
 * Converts from WebContainer format to sidebar Directory format
 * @param tree - The FileSystemTree to convert
 * @param name - The name of the directory (defaults to "root")
 * @param parentId - The parent directory ID (undefined for root)
 * @param depth - The depth level (defaults to 0)
 * @param parentPath - The parent's absolute path (defaults to "")
 * @returns A Directory in sidebar format
 */
export function convertToSidebarFormat(
  tree: FileSystemTree,
  name: string = "",
  parentId: string | undefined = undefined,
  depth: number = 0,
  parentPath: string = ""
): Directory {
  const dirId = generateId();
  const currentPath = parentPath ? `${parentPath}/${name}` : `/${name}`;
  const files: File[] = [];
  const dirs: Directory[] = [];

  // Process each entry in the tree
  for (const [entryName, node] of Object.entries(tree)) {
    if (isFileNode(node as FileNode)) {
      // It's a file
      files.push({
        id: generateId(),
        type: Type.FILE,
        name: entryName,
        parentId: dirId,
        depth: depth + 1,
        content: (node as FileNode).file.contents,
        absolutePath: null,
      });
    } else {
      // It's a directory
      const subDir = convertToSidebarFormat(
        (node as DirectoryNode).directory,
        entryName,
        dirId,
        depth + 1,
        currentPath
      );
      dirs.push(subDir);
    }
  }

  return {
    id: dirId,
    type: Type.DIRECTORY,
    name,
    parentId,
    depth,
    files,
    dirs,
    absolutePath: null,
  };
}

export function addAbsolutePaths(node: Directory, parentPath = "") {
  // Calculate the current absolute path
  const currentPath = parentPath ? `${parentPath}/${node.name}` : node.name;

  // Add absolutePath to the current node
  node.absolutePath = currentPath;

  // Recursively process all directories
  if (node.dirs && node.dirs.length > 0) {
    node.dirs.forEach((dir) => {
      addAbsolutePaths(dir, currentPath);
    });
  }

  // Add absolutePath to all files
  if (node.files && node.files.length > 0) {
    node.files.forEach((file) => {
      file.absolutePath = `${currentPath}/${file.name}`;
    });
  }

  return node;
}
