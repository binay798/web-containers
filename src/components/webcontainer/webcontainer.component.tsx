import { useEffect } from "react";
import { CustomTerminal } from "../terminal/terminal.component";
import { useSelector } from "../../store/hooks.store";
import type { WebContainer } from "@webcontainer/api";

interface Props {
  webContainer: WebContainer;
}
export function CustomWebContainer({ webContainer }: Props) {
  const webContainerFiles = useSelector(
    (store) => store.codeData.webContainerCodeData
  );
  useEffect(() => {
    // webContainer;
    // MOUNT FILES
    if (webContainerFiles) {
      // @ts-ignore
      webContainer?.mount(webContainerFiles);
    }
  }, [webContainerFiles, webContainer]);

  return (
    <div className="h-full">
      <CustomTerminal webContainer={webContainer as WebContainer} />
    </div>
  );
}
