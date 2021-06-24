import { test } from 'uvu';
import { equal } from 'uvu/assert';
import { parse } from './parser';

test('restProps/infer', () => {
  const output = parse(`
  <h1 {...$$restProps}>Hello</h1>
  `);
  equal(output.restProps, 'h1');
});

test('restProps/custom', () => {
  const output = parse(`
  <script>
    /**
     * @restProps {button | h1}
     */
  </script>

  <h1 {...$$restProps}>Hello</h1>
  `);
  equal(output.restProps, 'button | h1');
});

test.run();
