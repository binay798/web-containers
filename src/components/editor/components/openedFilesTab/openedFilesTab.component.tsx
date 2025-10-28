import { IoIosClose } from "react-icons/io";
import { useDispatch, useSelector } from "../../../../store/hooks.store";
import {
  removeTabFile,
  setActiveFileReducer,
} from "../../../../store/redux/editor/editor.slice";
import type { File } from "../../../sidebarFileManager/utils/fileManager";

export function OpenedFilesTab() {
  const openTabFiles = useSelector((store) => store.editor.openTabFiles);
  const activeFile = useSelector((store) => store.editor.activeFile);
  const dispatch = useDispatch();

  const removeTabFileHandler = (id: string) => {
    dispatch(removeTabFile(id));
  };

  const setActiveTabFileHandler = (file: File) => {
    dispatch(setActiveFileReducer(file));
  };

  return (
    <div className="text-stone-500">
      <div className="flex gap-0 border-b border-stone-700">
        {openTabFiles?.map((fl, id) => {
          return (
            <div
              key={id}
              className={`p-2 px-4 file-tab-item cursor-pointer flex justify-between items-center hover:bg-gray-800 gap-2 ${
                activeFile?.id === fl.id ? "bg-gray-800 text-orange-400" : ""
              }`}
              onClick={(el) => {
                el.stopPropagation();

                setActiveTabFileHandler(fl);
              }}
            >
              <p className="text-sm">{fl.name}</p>
              <div
                className="hover:bg-stone-800 rounded-lg"
                onClick={(el) => {
                  el.stopPropagation();

                  removeTabFileHandler(fl.id);
                }}
              >
                <IoIosClose size={22} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
