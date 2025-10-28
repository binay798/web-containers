import { Terminal as XTerminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import React from "react";
import { FitAddon } from "@xterm/addon-fit";
import type { WebContainer } from "@webcontainer/api";

interface Props {
  webContainer: WebContainer;
}
export function CustomTerminal({ webContainer }: Props) {
  const terminalRef = React.useRef<HTMLDivElement>(null);
  const [terminal, setTerminal] = React.useState<XTerminal | null>(null);
  const fitAddonRef = React.useRef<FitAddon | null>(null);

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (fitAddonRef.current) {
        fitAddonRef.current.fit();
      }
    });

    if (terminalRef.current) {
      resizeObserver.observe(terminalRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  React.useEffect(() => {
    if (!terminalRef.current) return;

    const terminal = new XTerminal({ convertEol: true });
    const fitAddon = new FitAddon();
    fitAddonRef.current = fitAddon;
    terminal.loadAddon(fitAddon);
    // terminalRef.current.style.height = "100%";
    setTerminal(terminal);

    terminal.open(terminalRef.current);
    fitAddon.fit();

    return () => {
      terminal.dispose();
      setTerminal(null);
    };
  }, [terminalRef]);

  React.useEffect(() => {
    if (!webContainer || !terminal) return;

    const startShell = async () => {
      if (!webContainer) return;
      const shellProcess = await webContainer.spawn("jsh", {
        terminal: {
          cols: terminal.cols,
          rows: terminal.rows,
        },
      });
      shellProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            terminal.write(data);
          },
        })
      );

      const input = shellProcess.input.getWriter();
      terminal.onData((data) => {
        input.write(data);
      });

      return shellProcess;
    };

    startShell();
  }, [webContainer, terminal]);

  return (
    <div className="h-full border">
      <div className="w-full h-full" ref={terminalRef}></div>
    </div>
  );
}
