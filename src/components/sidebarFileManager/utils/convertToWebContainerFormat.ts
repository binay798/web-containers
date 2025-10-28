import type { FileSystemTree } from "@webcontainer/api";
import type { Directory } from "./fileManager";

/**
 * Converts a Directory from sidebar format to WebContainer format
 * @param dir - The directory to convert
 * @returns A FileSystemTree compatible with WebContainer
 */
export function convertToWebContainerFormat(dir: Directory): FileSystemTree {
  const result: FileSystemTree = {};

  // Process all files in the directory
  for (const file of dir.files) {
    result[file.name] = {
      file: {
        contents: file.content,
      },
    };
  }

  // Process all subdirectories recursively
  for (const subDir of dir.dirs) {
    result[subDir.name] = {
      directory: convertToWebContainerFormat(subDir),
    };
  }

  return result;
}

/**
 * Alternative: Convert from a root directory entry point
 * Useful if you want to convert starting from the root
 */
export function convertRootToWebContainerFormat(
  root: Directory
): FileSystemTree {
  return convertToWebContainerFormat(root);
}
