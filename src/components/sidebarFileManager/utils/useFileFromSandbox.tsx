import React from "react";
import type { Directory } from "./fileManager";
import { useParams } from "react-router";
import { TEMPLATE_LIST } from "../../../constants/templates.constants";

export const useFilesFromSandbox = (callback: (dir: Directory) => void) => {
  const { playgroundId } = useParams();
  React.useEffect(() => {
    const templateName = TEMPLATE_LIST.filter((el) => el.id === playgroundId);
    fetch(templateName[0].name)
      .then((response) => response.json())
      .then((data) => {
        callback(data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
