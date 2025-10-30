import type { WebContainer } from "@webcontainer/api";
import React, { useRef } from "react";

interface Props {
  webContainer: WebContainer | null;
}
export function WebPreview({ webContainer }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  React.useEffect(() => {
    if (!webContainer || !iframeRef.current) return;

    webContainer.on("server-ready", (_, url) => {
      iframeRef.current!.src = url;
    });
  }, [webContainer]);

  return (
    <div className="w-full h-full bg-white">
      <iframe
        ref={iframeRef}
        className="h-full w-full border-2"
        src="loading.html"
      />
    </div>
  );
}
