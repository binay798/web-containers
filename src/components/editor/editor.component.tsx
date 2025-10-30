import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import Sidebar from "../sidebarFileManager/sidebar";
import { FileTree } from "../sidebarFileManager/fileTree.component";
import {
  findFileByName,
  Type,
  type Directory,
  type File,
} from "../sidebarFileManager/utils/fileManager";
import { useFilesFromSandbox } from "../sidebarFileManager/utils/useFileFromSandbox";
import { FileEditTab } from "../sidebarFileManager/components/fileEditTab/fileEditTab.component";
import { useDispatch, useSelector } from "../../store/hooks.store";
import {
  addTabFile,
  setActiveFileReducer,
} from "../../store/redux/editor/editor.slice";
import { getLanguageFromFileName } from "./utils/getLanguageFromFileName";
import { OpenedFilesTab } from "./components/openedFilesTab/openedFilesTab.component";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import {
  setMonacoEditorCodeData,
  setWebContainerCodeData,
} from "../../store/redux/codeData/codeData.slice";
import { convertRootToWebContainerFormat } from "../sidebarFileManager/utils/convertToWebContainerFormat";
import { addAbsolutePaths } from "../sidebarFileManager/utils/convertToSidebarFormat";
import type { WebContainer } from "@webcontainer/api";

const CURRENT_SANDBOX_ID = "ww9kis";

const dummyDir: Directory = {
  id: "1",
  name: "loading...",
  type: Type.DUMMY,
  parentId: undefined,
  depth: 0,
  dirs: [],
  files: [],
  absolutePath: null,
};

interface Props {
  webContainer: WebContainer;
}
export function MEditor({ webContainer }: Props) {
  const [rootDir, setRootDir] = useState(dummyDir);
  const editor = useSelector((store) => store.editor);
  // const sidebarFormat = useSelector(
  //   (store) => store.codeData.monacoEditorCodeData
  // );
  const dispatch = useDispatch();
  useFilesFromSandbox(CURRENT_SANDBOX_ID, (root) => {
    if (!editor.activeFile) {
      const file = findFileByName(root, "index.tsx");
      if (file) {
        // dispatch(setActiveFileReducer(file));
      }
    }

    dispatch(setMonacoEditorCodeData(JSON.parse(JSON.stringify(root))));
    const convertedWebContainerCodeData = convertRootToWebContainerFormat(
      JSON.parse(JSON.stringify(root))
    );
    dispatch(setWebContainerCodeData(convertedWebContainerCodeData));
    const x = addAbsolutePaths(root);
    setRootDir(x);
  });

  const onSelect = (file: File) => {
    dispatch(addTabFile(file));
    dispatch(setActiveFileReducer(file));
  };
  const language = getLanguageFromFileName(
    editor.activeFile?.name ?? "index.html"
  );

  const handleCodeChange = async (content: string) => {
    // if (!webContainer) return;
    if (editor.activeFile?.absolutePath) {
      await webContainer?.fs.writeFile(
        editor.activeFile?.absolutePath,
        content
      );
    }
    // console.log(editor.activeFile, content);
  };

  return (
    <div className="h-full">
      <div className="flex gap-0 h-full">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={20}>
            <div>
              <FileEditTab />
              <Sidebar>
                <FileTree
                  rootDir={rootDir}
                  // selectedFile={selectedFile as File}
                  selectedFile={editor.activeFile as File}
                  onSelect={onSelect}
                />
              </Sidebar>
            </div>
          </Panel>
          <PanelResizeHandle className="w-0.5 bg-stone-600" />
          <Panel>
            <div className="flex flex-col w-full h-full">
              <OpenedFilesTab />
              <Editor
                theme="vs-dark"
                height={"100%"}
                width={"100%"}
                value={editor.activeFile?.content ?? ""}
                language={language}
                options={{
                  minimap: { enabled: false },
                  renderValidationDecorations: "off",
                }}
                onChange={(value) => handleCodeChange(value || "")}
              />
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
