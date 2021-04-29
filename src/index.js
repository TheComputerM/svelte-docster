const { parse } = require("svelte/compiler");

const path = require("path");
const fs = require("fs");

import extractProps from "./extractProps";
import extractTags from "./extractTags";

/**
 * @param {{file: string, content: string, filename: string}} options
 */
export default (options) => {
  const file = options.file;

  let content, filename;
  if (file) {
    content = fs.readFileSync(file).toString();
    filename = path.basename(file);
  } else {
    ({ content, filename } = options);
  }

  const styleRegex = /<style(.)*>(.|\n)*<\/style>/;
  const processed = content.replace(styleRegex, "");
  const ast = parse(processed, {
    filename,
    customElement: false,
  });

  const jsast = (ast.instance && ast.instance.content) || "";

  const tags = extractTags(ast, content);
  const props = extractProps(jsast);

  return {
    props,
    ...tags,
  };
};
