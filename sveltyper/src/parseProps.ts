import parsePropType from './parsePropType';
import type { Props } from 'svelte-docster/types/extractProps';

function comment({ description, value, valueType }) {
  const noDescription = !description;
  const noValue = !value || valueType === 'Identifier';

  if (noDescription && noValue) return '';

  const output = ['/**'];
  if (!noDescription) output.push(` * ${description}`);
  if (!noValue) output.push(` * @default ${value}`);
  output.push(' */');
  return output.join('\n');
}

export default (props: Props) => {
  const output = [];
  for (const [name, prop] of Object.entries(props)) {
    if (prop.kind === 'let') {
      const type = parsePropType(prop);
      const value = `${name}${prop.required ? '' : '?'}: ${type};`;
      output.push(comment(prop) + '\n' + value);
    }
  }
  return output.join('\n\n');
};
