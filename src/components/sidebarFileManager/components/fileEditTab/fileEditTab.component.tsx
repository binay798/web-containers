import { AiOutlineFileAdd } from "react-icons/ai";
import { AiOutlineFolderAdd } from "react-icons/ai";

export function FileEditTab() {
  return (
    <div className="text-white">
      <div className="top p-2">
        <p className="text-xs text-stone-400">EXPLORER</p>
      </div>
      <div className="bottom p-2 flex justify-between items-center pt-0">
        <p className="text-xs text-stone-400 font-semibold ">GET STARTED</p>
        <div className="flex gap-2">
          <AiOutlineFileAdd />
          <AiOutlineFolderAdd size={19} />
        </div>
      </div>
    </div>
  );
}
