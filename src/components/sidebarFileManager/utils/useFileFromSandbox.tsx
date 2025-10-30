import React from "react";
import type { Directory } from "./fileManager";
import { useParams } from "react-router";
import { TEMPLATE_LIST } from "../../../constants/templates.constants";

export const useFilesFromSandbox = (
  id: string,
  callback: (dir: Directory) => void
) => {
  const { playgroundId } = useParams();
  React.useEffect(() => {
    // fetch("https://codesandbox.io/api/v1/sandboxes/" + id)
    const templateName = TEMPLATE_LIST.filter((el) => el.id === playgroundId);
    fetch(templateName[0].name)
      .then((response) => response.json())
      // .then(({ data }) => {
      .then((data) => {
        // const rootDir = buildFileTree(data);
        callback(data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
