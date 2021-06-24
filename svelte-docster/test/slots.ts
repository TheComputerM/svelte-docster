import { test } from 'uvu';
import { equal } from 'uvu/assert';
import { parse } from './parser';

test('default', () => {
  const output = parse(`
  <script>
    /**
     * @slot default a simple description
     */
  </script>

  <slot />
  `);

  equal(output.slots, {
    default: {
      type: '',
      description: 'a simple description',
      attributes: {},
      content: '<slot />',
    },
  });
});

test('named', () => {
  const output = parse(`
  <script>
    /**
     * @slot slot1 some description
     */
  </script>

  <slot name="slot1" />

  `);

  equal(output.slots, {
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

test('attributes', () => {
  const output = parse(`
  <script>
    /**
     * @slot {{prop1:string;}} default
     * @slot {{i:number;}} repeated
     */

    let value = 'a';
  </script>

  <slot basic="prop" />
  <slot name="shorthand" {value} />

  {#each Array(10) as _, i}
    <slot name="repeated" {i} />
  {/each}
  `);

  equal(output.slots, {
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

test.run();
