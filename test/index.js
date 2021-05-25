import path from 'path';
import doc from '../src/index';

import { test } from 'uvu';
import * as assert from 'uvu/assert';

function inspect(filepath, testfn, only = false) {
  const output = doc({
    file: path.join(__dirname, 'fixtures', filepath + '.svelte'),
  });
  (only ? test.only : test)(filepath, () => {
    testfn(output);
  });
}

function compare(output, input) {
  assert.snapshot(JSON.stringify(output, null, 2), JSON.stringify(input, null, 2));
}

/**
 * Props
 */

inspect('props/let', (o) => {
  compare(o.props, {
    prop1: {
      value: "'value'",
      valueType: 'Literal',
      localName: 'prop1',
      kind: 'let',
      required: false,
      description: 'This is a prop.',
      tags: [],
    },
    prop2: {
      value: null,
      valueType: null,
      localName: 'prop2',
      kind: 'let',
      required: true,
      description: 'should parse this',
      tags: [],
    },
    prop3: {
      value: null,
      valueType: null,
      localName: 'prop3',
      kind: 'let',
      required: true,
      description: null,
      tags: [],
    },
    prop4: {
      value: null,
      valueType: null,
      localName: 'prop4',
      kind: 'let',
      required: true,
      description: null,
      tags: [],
    },
  });
});

inspect('props/const', (o) => {
  compare(o.props, {
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

inspect('props/function', (o) => {
  compare(o.props, {
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

inspect('props/change.name', (o) => {
  compare(o.props, {
    prop2: {
      value: null,
      valueType: null,
      localName: 'prop1',
      kind: 'let',
      required: true,
      description: 'This is a prop.',
      tags: [],
    },
  });
});

inspect('props/export.notfound', (o) => {
  compare(o.props, {
    name: {
      value: 'somevar',
      valueType: 'Identifier',
      localName: 'prop1',
      kind: 'let',
      required: false,
      description: null,
      tags: [],
    },
  });
});

inspect('props/no.default', (o) => {
  compare(o.props, {
    prop1: {
      value: null,
      valueType: null,
      localName: 'prop1',
      kind: 'let',
      required: true,
      description: 'This is required.',
      tags: [],
    },
  });
});

inspect('props/multiple.export', (o) => {
  compare(o.props, {
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

inspect('props/tags', (o) => {
  compare(o.props, {
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

/**
 * Events
 */

inspect('events/dispatch', (o) => {
  compare(o.events, {
    button: {
      eventDetail: '{cool: boolean}',
      description: 'A very cool event.',
    },
  });
});

inspect('events/forward', (o) => {
  compare(o.events, {
    click: {
      eventDetail: 'window',
      description: null,
      by: 'Element',
      trigger: 'button',
    },
  });
});

/**
 * Slots
 */

inspect('slots/default', (o) => {
  compare(o.slots, {
    default: {
      type: '',
      description: 'a simple description',
      attributes: {},
      content: '<slot />',
    },
  });
});

inspect('slots/named', (o) => {
  compare(o.slots, {
    slot1: {
      type: '',
      description: 'some description',
      attributes: {
        name: {
          value: 'slot1',
          valueType: 'Text',
        },
      },
      content: '<slot name="slot1" />',
    },
  });
});

inspect('slots/attributes', (o) => {
  compare(o.slots, {
    default: {
      type: '{prop1:string;}',
      description: '',
      attributes: {
        basic: {
          value: 'prop',
          valueType: 'Text',
        },
      },
      content: '<slot basic="prop" />',
    },
    shorthand: {
      type: null,
      description: null,
      attributes: {
        name: {
          value: 'shorthand',
          valueType: 'Text',
        },
        value: {
          value: 'value',
          valueType: 'AttributeShorthand',
        },
      },
      content: '<slot name="shorthand" {value} />',
    },
    repeated: {
      type: '{i:number;}',
      description: '',
      attributes: {
        name: {
          value: 'repeated',
          valueType: 'Text',
        },
        i: {
          value: 'i',
          valueType: 'AttributeShorthand',
        },
      },
      content: '<slot name="repeated" {i} />',
    },
  });
});

/**
 * Styles
 */

inspect('styles/basic', (o) => {
  compare(o.styles, {
    '--some-var': {
      description: 'Description of CSS variable',
      default: "'20px'",
      type: 'string',
    },
    '--another-var': {
      description: 'No default',
      default: null,
      type: '',
    },
  });
});

inspect('styles/combined', (o) => {
  compare(o.styles, {
    '--prop1': {
      description: 'Description1',
      default: '1',
      type: '',
    },
    '--prop2': {
      description: 'Description2',
      default: '2',
      type: '',
    },
    '--prop3': {
      description: 'Description3',
      default: '3',
      type: '',
    },
  });
});

/**
 * restProps
 */

inspect('restProps/infer', (o) => {
  assert.equal(o.restProps, 'h1');
});

inspect('restProps/custom', (o) => {
  assert.equal(o.restProps, 'button | h1');
});

/**
 * Typedef
 */

inspect('typedef/basic', (o) => {
  compare(o.typedef, {
    RandomType: {
      value: 'string | boolean',
      description: 'cats > dogs',
    },
    Nested: {
      value: '{key1: {key2?: boolean}}',
      description: 'some description',
    },
  });
});

/**
 * Others
 */

inspect('others/basic', (o) => {
  compare(o, {
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

inspect('others/basic', (o) => {
  compare(o, {
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

inspect('others/bad.style.tag', (o) => {
  compare(o, {
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

/**
 * Module
 */

inspect('module/basic', (o) => {
  compare(o.module, {
    doSomething: {
      value: '() => {}',
      valueType: 'ArrowFunctionExpression',
      localName: 'doSomething',
      kind: 'const',
      required: false,
      description: 'description',
      tags: [],
    },
  });
});

test.run();
