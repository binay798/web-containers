import { Terminal as XTerminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import React, { useEffect } from "react";
import { FitAddon } from "@xterm/addon-fit";
import type { WebContainer } from "@webcontainer/api";
import { useSelector } from "../../store/hooks.store";

interface Props {
  webContainer: WebContainer;
}
export function CustomTerminal({ webContainer }: Props) {
  const terminalRef = React.useRef<HTMLDivElement>(null);
  const [terminal, setTerminal] = React.useState<XTerminal | null>(null);
  const fitAddonRef = React.useRef<FitAddon | null>(null);
  const codeData = useSelector((store) => store.codeData);

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

  useEffect(() => {
    (async () => {
      if (codeData.monacoEditorCodeData && terminal && webContainer) {
        // 4️⃣ Spawn npm install
        const installProcess = await webContainer.spawn("npm", ["install"]);

        // 5️⃣ Pipe process output to xterm
        installProcess.output.pipeTo(
          new WritableStream({
            write(data) {
              terminal?.write(data);
            },
          })
        );

        // 6️⃣ Wait for exit
        const exitCode = await installProcess.exit;
        if (exitCode !== 0) {
          terminal?.writeln("\x1b[31m❌ Installation failed\x1b[0m");
        } else {
          terminal?.writeln(
            "\x1b[32m✅ Dependencies installed successfully!\x1b[0m"
          );
          const devProcess = await webContainer.spawn("npm", ["run", "dev"]);
          devProcess.output.pipeTo(
            new WritableStream({
              write(data) {
                terminal?.write(data);
              },
            })
          );
        }
      }
    })();
  }, [codeData.monacoEditorCodeData, terminal, webContainer]);

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
