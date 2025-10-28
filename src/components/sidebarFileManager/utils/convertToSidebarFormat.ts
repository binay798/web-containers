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
 * @returns A Directory in sidebar format
 */
export function convertToSidebarFormat(
  tree: FileSystemTree,
  name: string = "root",
  parentId: string | undefined = undefined,
  depth: number = 0
): Directory {
  const dirId = generateId();
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
      });
    } else {
      // It's a directory
      const subDir = convertToSidebarFormat(
        // @ts-ignore
        (node as DirectoryNode).directory, // CHANGED
        entryName,
        dirId,
        depth + 1
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
  };
}
