import { test } from 'uvu';
import { equal } from 'uvu/assert';
import { parse } from './parser';

test('basic styles', () => {
  const output = parse(`
  <script>
    /**
     * @style {20px} --some-var Description of CSS variable
     */

    /**
     * @style --another-var No default
     */
  </script>
  `);

  equal(output.styles, {
    '--some-var': {
      description: 'Description of CSS variable',
      default: '20px',
    },
    '--another-var': {
      description: 'No default',
      default: '',
    },
  });
});

test('multiple styles in one comment', () => {
  const output = parse(`
  <script>
    /**
     * @style {1} --prop1 Description 1
     *
     * @style {2} --prop2 Description 2
     *
     *
     * @style {3} --prop3 Description 3
     */
  </script>
  `);

  equal(output.styles, {
    '--prop1': {
      description: 'Description 1',
      default: '1',
    },
    '--prop2': {
      description: 'Description 2',
      default: '2',
    },
    '--prop3': {
      description: 'Description 3',
      default: '3',
    },
  });
});

test.run();
