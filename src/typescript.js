import fs from "fs";
import path from "path";
import s2tsx from "svelte2tsx";
import { transform as sucrase } from "sucrase";
import docster from "./index";

export default (options) => {
  const file = options.file;

  let content, filename;
  if (file) {
    content = fs.readFileSync(file).toString();
    filename = path.basename(file);
  } else {
    ({ content, filename } = options);
  }

  const scriptRegex = /<script(.*)>((.|\n)*?)<\/script>/;
  const scriptContentTS = scriptRegex.exec(content)[2];
  const scriptContentJS = sucrase(scriptContentTS, {
    transforms: ["typescript"],
  }).code;

  const docs = docster({
    content: `<script>${scriptContentJS}</script>`,
    filename,
  });

  const tsMetadata = s2tsx(content, { filename, strictMode: false }).exportedNames;

  for (const propName of Object.keys(docs.props)) {
    if (tsMetadata.has(propName)) {
      const tsprop = tsMetadata.get(propName);
      const prop = docs.props[propName];
      if (tsprop.type) {
        prop.type = tsprop.type;
      } else {
        try {
          prop.type = typeof JSON.parse(prop.value);
        } catch {
          prop.type = null;
        }
      }
    }
  }

  return docs;
};