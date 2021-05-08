import { parse } from "svelte/compiler";

import path from "path";
import fs from "fs";

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

  const moduleast = (ast.module && ast.module.content) || "";
  const module = extractProps(moduleast);

  return {
    props,
    ...tags,
    module,
  };
};
