import { test } from 'uvu';
import { equal } from 'uvu/assert';
import { parse } from './parser';

test('using an event dispatcher', () => {
  const output = parse(`
  <script>
    /**
     * @event {{cool: boolean}} button A very cool event.
     */

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
  </script>

  <button
    on:click={() => {
      dispatch('button', { cool: true });
    }}
  >
    Click
  </button>
  `);

  equal(output.events, {
    button: {
      eventDetail: '{cool: boolean}',
      description: 'A very cool event.',
    },
  });
});

test('forward native events', () => {
  const output = parse(`
  <button on:click> Click on Button </button>
  `);

  equal(output.events, {
    click: {
      eventDetail: 'window',
      description: null,
      by: 'Element',
      trigger: 'button',
    },
  });
});

test('forward custom events from elements', () => {
  const output = parse(`
  <script>
    /** @event {{a: string}} custom This is a custom event using node.dispatchEvent */
  </script>
  <button on:custom> Click on Button </button>
  `);

  equal(output.events, {
    custom: {
      eventDetail: '{a: string}',
      description: 'This is a custom event using node.dispatchEvent',
      by: 'Element',
      trigger: 'button',
    },
  });
});

test('should not forward this event', () => {
  const output = parse(`
  <button on:click={() => {}}> Will not Forward </button>
  `);

  equal(output.events, {});
});

test.run();
