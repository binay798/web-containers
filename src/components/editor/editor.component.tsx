import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import Sidebar from "../sidebarFileManager/sidebar";
import { FileTree } from "../sidebarFileManager/fileTree.component";
import {
  findFileByName,
  Type,
  type Directory,
} from "../sidebarFileManager/utils/fileManager";
import { useFilesFromSandbox } from "../sidebarFileManager/utils/useFileFromSandbox";

const CURRENT_SANDBOX_ID = "ww9kis";

const dummyDir: Directory = {
  id: "1",
  name: "loading...",
  type: Type.DUMMY,
  parentId: undefined,
  depth: 0,
  dirs: [],
  files: [],
};

export function MEditor() {
  const [rootDir, setRootDir] = useState(dummyDir);
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  useFilesFromSandbox(CURRENT_SANDBOX_ID, (root) => {
    if (!selectedFile) {
      const file = findFileByName(root, "index.tsx");
      if (file) {
        // @ts-ignore
        setSelectedFile(file);
      }
    }
    setRootDir(root);
  });

  const onSelect = (file: File) => setSelectedFile(file);

  return (
    <div className="h-[90vh]">
      <div className="flex gap-0">
        <div>
          <Sidebar>
            <FileTree
              rootDir={rootDir}
              selectedFile={selectedFile as File}
              onSelect={onSelect}
            />
          </Sidebar>
        </div>
        <Editor theme="vs-dark" height={200} />
      </div>
    </div>
  );
}
