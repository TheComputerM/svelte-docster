import { parse } from 'svelte/compiler';

import { basename } from 'path';
import { readFileSync } from 'fs';

import extractProps from './extractProps';
import extractTags from './extractTags';

interface Options {
  file?: string;
  content?: string;
  filename?: string;
}

export default (options: Options) => {
  const file = options.file;

  let content: string, filename: string;
  if (file) {
    content = readFileSync(file).toString();
    filename = basename(file);
  } else {
    ({ content, filename } = options);
  }

  const styleRegex = /<style(.)*>(.|\n)*<\/style>/;
  const processed = content.replace(styleRegex, '');
  const ast = parse(processed, {
    filename,
    customElement: false,
  });

  const jsast = (ast.instance && ast.instance.content) || '';
  const tags = extractTags(ast, content);
  const props = extractProps(jsast);

  const moduleast = (ast.module && ast.module.content) || '';
  const module = extractProps(moduleast);

  return {
    props,
    ...tags,
    module,
  };
};
