import { useRoutes } from "react-router";
import App from "./App";
import Playground from "./pages/playground/playground.page";

export function CustomRouter() {
  const element = useRoutes([
    {
      path: "/",
      element: <App />,
    },
    { path: "/playground/:playgroundId", element: <Playground /> },
  ]);

  return element;
}
