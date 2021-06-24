import { test } from 'uvu';
import { equal } from 'uvu/assert';
import { parse } from './parser';

test('default', () => {
  const output = parse(`
  <script>
    /**
     * @typedef {string | boolean} RandomType cats > dogs
     * @typedef {{key1: {key2?: boolean}}} Nested some description
     */
  </script>
  `);

  equal(output.typedef, {
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

test.run();
