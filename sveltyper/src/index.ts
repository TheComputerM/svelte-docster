import doc from 'svelte-docster';
import { basename } from 'path';
import indent from './indent';
import parseTypedef from './parseTypedef';
import parseProps from './parseProps';
import parseRestProps from './parseRestProps';
import parseSlots from './parseSlots';
import parseEvents from './parseEvents';

interface Options {
  file?: string;
  content?: string;
  filename?: string;
}

export default ({ file, content, filename }: Options) => {
  const info = doc({ file, content, filename });
  const name = basename(file || filename, '.svelte');
  return [
    parseTypedef(info.typedef),
    `interface ${name}Props ${parseRestProps(info.restProps)}{`,
    indent(parseProps(info.props), 2),
    '}',
    '',
    `declare class ${name} extends SvelteComponentTyped<`,
    indent(`${name}Props,`, 2),
    indent(parseEvents(info.events), 2) + ',',
    indent(parseSlots(info.slots), 2),
    '> {}',
  ].join('\n');
};
