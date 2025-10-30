import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/reducers.store.ts";
import { HashRouter } from "react-router";
import { CustomRouter } from "./Router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <HashRouter>
        <CustomRouter />
      </HashRouter>
    </Provider>
  </StrictMode>
);
