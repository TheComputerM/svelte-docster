import { test } from 'uvu';
import { fixture } from 'uvu/assert';
import dedent from 'ts-dedent';
import sveltyper from '../src/index';

function compare(input: string, output: string) {
  const dts = sveltyper({ content: dedent(input), filename: 'App.svelte' });
  fixture(dts, dedent(output));
}

test('e2e events', () => {
  compare(
    `
    <script>
      /**
       * @event {{ key: string }} button:key
       */

      export let key = "";

      import { createEventDispatcher } from "svelte";

      const dispatch = createEventDispatcher();

      $: dispatch("button:key", { key });
    </script>

    <button on:click>
      Helo
    </button>`,

    `

    interface AppProps {
      /**
       * @default ""
       */
      key?: string;
    }

    declare class App extends SvelteComponentTyped<
      AppProps,
      {'button:key': { key: string }; click: WindowEventMap["click"];},
      {}
    > {}`,
  );
});

test('e2e slots', () => {
  compare(
    `
    <script>
      /**
       * @slot {{ prop: number; doubled: number; }}
       * @slot {{ props: { class?: string; } }} description
       */

      export let prop = 0;
    </script>

    <h1>
      <slot {prop} doubled={prop * 2} />
    </h1>

    <p>
      <slot name="description" props={{ class: $$props.class }} />
    </p>`,
    `

  interface AppProps {
    /**
     * @default 0
     */
    prop?: number;
  }

  declare class App extends SvelteComponentTyped<
    AppProps,
    {},
    {default: {}; description: { props: { class?: string; } };}
  > {}`,
  );
});

test('e2e props', () => {
  compare(
    `
    <script>
      /**
       * Some description.
       */
      export let required;

      /**
       * @type {boolean}
       */
      export let cool = true;

      /**
       * Invisible
       */
      export const lol = "bye";

      export let noDefault = a;
    </script>`,

    `

    interface AppProps {
      /**
       * Some description.
       */
      required: any;

      /**
       * @default true
       */
      cool?: boolean;


      noDefault?: any;
    }

    declare class App extends SvelteComponentTyped<
      AppProps,
      {},
      {}
    > {}`,
  );
});

test('e2e typedefs', () => {
  compare(
    `
    <script>
      /**
       * @typedef {string} AuthorName
       * @typedef {{ name?: AuthorName; dob?: string; }} Author
       */

      /** @type {Author} */
      export let author = {};

      /** @type {Author[]} */
      export let authors = [];
    </script>`,

    `
    declare type AuthorName = string;
    declare type Author = { name?: AuthorName; dob?: string; };
    interface AppProps {
      /**
       * @default {}
       */
      author?: Author;

      /**
       * @default []
       */
      authors?: Author[];
    }

    declare class App extends SvelteComponentTyped<
      AppProps,
      {},
      {}
    > {}`,
  );
});

test('e2e restProps', () => {
  compare(
    `
    <script>
      /** @restProps {h1 | button} */

      let edit = false;
    </script>

    {#if edit}
      <button {...$$restProps} />
    {:else}
      <h1 {...$$restProps}><slot /></h1>
    {/if}`,

    `

    interface AppProps extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["h1"]>, svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["button"]> {

    }

    declare class App extends SvelteComponentTyped<
      AppProps,
      {},
      {default: {};}
    > {}`,
  );
});

test.run();
