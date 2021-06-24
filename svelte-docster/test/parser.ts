import { test } from 'uvu';
import { equal } from 'uvu/assert';
import dedent from 'ts-dedent';
import doc from '../src/index';

export function parse(input: string) {
  return doc({ content: dedent(input), filename: 'App.svelte' });
}

test('basic', () => {
  const output = parse(`
  <script>
    /**
     * About component
     * @component Button
     *
     * @example
     * For example
     * \`\`\`js
     * import 'Component'
     * \`\`\`
     * to import component.
     */
  </script>
  `);

  equal(output, {
    props: {},
    slots: {},
    events: {},
    typedef: {},
    restProps: null,
    styles: {},
    all: [
      {
        description: 'About component',
        tags: [
          {
            tag: 'component',
            name: 'Button',
            type: '',
            description: '',
            optional: false,
          },
          {
            tag: 'example',
            name: '',
            type: '',
            description: "For example ```js import 'Component' ``` to import component.",
            optional: false,
          },
        ],
      },
    ],
    module: {},
  });
});

test('bad style tag', () => {
  const output = parse(`
  <style>
    s,v js v asjks v a v[][28ye21e]-== s
  </style>
  `);

  equal(output, {
    props: {},
    slots: {},
    events: {},
    typedef: {},
    restProps: null,
    styles: {},
    all: [],
    module: {},
  });
});
