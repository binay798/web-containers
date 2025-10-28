export const getLanguageFromFileName = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  switch (extension) {
    // TypeScript / JavaScript
    case "ts":
    case "tsx":
      return "typescript";
    case "js":
    case "jsx":
      return "javascript";

    // Web
    case "html":
      return "html";
    case "css":
      return "css";
    case "scss":
      return "scss";
    case "sass":
      return "scss";
    case "less":
      return "less";
    case "vue":
      return "vue";
    case "astro":
      return "html";

    // Backend / Markup
    case "json":
      return "json";
    case "yaml":
    case "yml":
      return "yaml";
    case "xml":
      return "xml";
    case "md":
    case "markdown":
      return "markdown";
    case "sql":
      return "sql";
    case "sh":
    case "bash":
      return "shell";
    case "bat":
      return "bat";
    case "ini":
      return "ini";
    case "toml":
      return "toml";
    case "env":
      return "plaintext";

    // C-family
    case "c":
      return "c";
    case "cpp":
    case "cc":
    case "cxx":
    case "h":
    case "hpp":
      return "cpp";
    case "java":
      return "java";
    case "cs":
      return "csharp";

    // Python / Ruby / PHP / etc.
    case "py":
      return "python";
    case "rb":
      return "ruby";
    case "php":
      return "php";
    case "go":
      return "go";
    case "rs":
      return "rust";
    case "swift":
      return "swift";
    case "kt":
    case "kts":
      return "kotlin";

    // Data and Config
    case "csv":
      return "csv";
    case "tsv":
      return "plaintext";
    case "conf":
      return "ini";
    case "dockerfile":
      return "dockerfile";
    case "dockerignore":
      return "plaintext";

    // Others
    case "txt":
      return "plaintext";
    case "log":
      return "plaintext";
    case "graphql":
    case "gql":
      return "graphql";

    default:
      return "plaintext";
  }
};
