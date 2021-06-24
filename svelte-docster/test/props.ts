import { test } from 'uvu';
import { equal } from 'uvu/assert';
import { parse } from './parser';

test('let', () => {
  const output = parse(`
  <script>
    /**
     * This is a prop.
     */
    export let a = 'value';

    // should parse this comment
    export let b;


    // should not parse this comment

    export let c;

    /**
     * Should not parse this comment also
     * @type {string}
     */

    export let d;
  </script>
  `);

  equal(output.props, {
    a: {
      value: "'value'",
      valueType: 'Literal',
      localName: 'a',
      kind: 'let',
      required: false,
      description: 'This is a prop.',
      tags: [],
    },
    b: {
      value: null,
      valueType: null,
      localName: 'b',
      kind: 'let',
      required: true,
      description: 'should parse this comment',
      tags: [],
    },
    c: {
      value: null,
      valueType: null,
      localName: 'c',
      kind: 'let',
      required: true,
      description: null,
      tags: [],
    },
    d: {
      value: null,
      valueType: null,
      localName: 'd',
      kind: 'let',
      required: true,
      description: null,
      tags: [],
    },
  });
});

test('const', () => {
  const output = parse(`
  <script>
    /**
     * This is a prop.
     */
    export const prop1 = 'value';
  </script>
  `);

  equal(output.props, {
    prop1: {
      value: "'value'",
      valueType: 'Literal',
      localName: 'prop1',
      kind: 'const',
      required: false,
      description: 'This is a prop.',
      tags: [],
    },
  });
});

test('function', () => {
  const output = parse(`
  <script>
    /**
     * This is an exported function.
     * @param {string} arg1 thing to log
     */
    export function doSomething(arg1) {
      console.log(arg1);
    }
  </script>
  `);

  equal(output.props, {
    doSomething: {
      value: 'function doSomething(arg1) {\n  console.log(arg1);\n}',
      valueType: 'FunctionDeclaration',
      localName: 'doSomething',
      kind: 'function',
      required: false,
      description: 'This is an exported function.',
      tags: [
        {
          tag: 'param',
          type: 'string',
          name: 'arg1',
          description: 'thing to log',
        },
      ],
    },
  });
});

test('export { name1 as name2 }', () => {
  const output = parse(`
  <script>
    /**
     * This is a prop.
     */
    let a;

    export { a as b };

    const c = 'this is a constant';

    export { c as d };
  </script>
`);

  equal(output.props, {
    b: {
      value: null,
      valueType: null,
      localName: 'a',
      kind: 'let',
      required: true,
      description: 'This is a prop.',
      tags: [],
    },
    d: {
      value: "'this is a constant'",
      valueType: 'Literal',
      localName: 'c',
      kind: 'const',
      required: false,
      description: null,
      tags: [],
    },
  });
});

test('default value of prop is another variable', () => {
  const output = parse(`
  <script>
    let a = anothervar;

    export { a as b };
  </script>
  `);

  equal(output.props, {
    b: {
      value: 'anothervar',
      valueType: 'Identifier',
      localName: 'a',
      kind: 'let',
      required: false,
      description: null,
      tags: [],
    },
  });
});

test('multiple exports together', () => {
  const output = parse(`
  <script>
    // is a
    let prop1 = 'value 1';

    // is b
    let prop2 = 'value 2';

    export { prop1 as a, prop2 as b };
  </script>
  `);

  equal(output.props, {
    a: {
      value: "'value 1'",
      valueType: 'Literal',
      localName: 'prop1',
      kind: 'let',
      required: false,
      description: 'is a',
      tags: [],
    },
    b: {
      value: "'value 2'",
      valueType: 'Literal',
      localName: 'prop2',
      kind: 'let',
      required: false,
      description: 'is b',
      tags: [],
    },
  });
});

test('tags', () => {
  const output = parse(`
  <script>
    /**
     * This has tags for props.
     */

    /**
     * @type {string}
     */
    export let a = '';

    /**
     * @author TheComputerM
     * @description MultipleTags
     * @example 3 tags
     */
    let b = '';

    export { b as c };

    /**
     * Multiple line
     * description
     * @returns {"hello"}
     */
    export function d() {return "hello"}
  </script>
  `);

  equal(output.props, {
    a: {
      value: "''",
      valueType: 'Literal',
      localName: 'a',
      kind: 'let',
      required: false,
      description: '',
      tags: [
        {
          tag: 'type',
          type: 'string',
          name: '',
          description: '',
        },
      ],
    },
    c: {
      value: "''",
      valueType: 'Literal',
      localName: 'b',
      kind: 'let',
      required: false,
      description: '',
      tags: [
        {
          tag: 'author',
          type: '',
          name: 'TheComputerM',
          description: '',
        },
        {
          tag: 'description',
          type: '',
          name: 'MultipleTags',
          description: '',
        },
        {
          tag: 'example',
          type: '',
          name: '3',
          description: 'tags',
        },
      ],
    },
    d: {
      value: 'function d() {\n  return "hello";\n}',
      valueType: 'FunctionDeclaration',
      localName: 'd',
      kind: 'function',
      required: false,
      description: 'Multiple line description',
      tags: [
        {
          tag: 'returns',
          type: '"hello"',
          name: '',
          description: '',
        },
      ],
    },
  });
});

test.run();
