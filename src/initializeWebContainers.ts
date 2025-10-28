import { WebContainer } from "@webcontainer/api";

export let webContainer: WebContainer | null = null;
export async function initWebContainer() {
  if (webContainer) return webContainer;

  webContainer = await WebContainer.boot();
}

await initWebContainer();
