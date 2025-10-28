type FileNode = {
  file: {
    contents: string;
  };
};

type DirectoryNode = {
  directory: {
    files: FileSystemTree;
  };
};

export type FileSystemTree = {
  [name: string]: FileNode | DirectoryNode;
};
