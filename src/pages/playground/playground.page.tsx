import { MEditor } from "../../components/editor/editor.component";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { CustomWebContainer } from "../../components/webcontainer/webcontainer.component";
import { WebContainer } from "@webcontainer/api";
import { useEffect, useState } from "react";
import { WebPreview } from "../../components/webPreview/webPreview.component";

function Playground() {
  const [webContainer, setWebContainer] = useState<WebContainer | null>(null);

  useEffect(() => {
    const createWebContainer = async () => {
      const webContainerInstance = await WebContainer.boot();
      setWebContainer(webContainerInstance);
    };

    createWebContainer();

    // Ideally, we should clean up the WebContainer instance when the component is unmounted.
    // But there is an issue with the current implementation of WebContainer that prevents it from being torn down.
    // https://github.com/stackblitz/webcontainer-core/issues/1125
    // return () => {
    //   webContainer?.teardown();
    //   setWebContainer(null);
    // };
  }, []);
  return (
    <div className="text-white h-full">
      <PanelGroup direction="horizontal">
        <Panel>
          <PanelGroup direction="vertical">
            <Panel defaultSize={80}>
              <MEditor webContainer={webContainer as WebContainer} />
            </Panel>
            <PanelResizeHandle className="h-0.5 bg-stone-700" />
            <Panel defaultSize={20}>
              <CustomWebContainer webContainer={webContainer as WebContainer} />
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle className="w-0.5 bg-stone-700" />
        <Panel defaultSize={30}>
          <WebPreview webContainer={webContainer as WebContainer} />
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default Playground;
