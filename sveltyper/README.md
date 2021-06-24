<h1 align="center">sveltyper</h1>
<p>
  <img alt="Version" src="https://img.shields.io/npm/v/sveltyper" />
  <a href="https://github.com/TheComputerM/svelte-docster/tree/main/sveltyper#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/TheComputerM/sveltyper/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/TheComputerM/svelte-docster/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/TheComputerM/svelte-docster" />
  </a>
  <a href="https://twitter.com/TheComputerM" target="_blank">
    <img alt="Twitter: TheComputerM" src="https://img.shields.io/twitter/follow/TheComputerM.svg?style=social" />
  </a>
</p>

> A tool to generate typescript declaration files for Svelte component.

### 🏠 [Homepage](https://github.com/TheComputerM/svelte-docster/tree/main/sveltyper#readme)

## Install

```sh
npm i -D sveltyper
```

## Features

- Lightweight
- Can handle any type of CSS (like SASS,SCSS)
- Can use `export {prop1 as prop2}` syntax
- Can use `export function doSomething() {}` syntax
- Can extract:
  - props
  - slots
  - forwarded events
  - dispatched events
  - $$restProps
  - type definitions

## Usage

### JS API

```js
const sveltyper = require('sveltyper');

sveltyper({
  // provide either the full path to the svelte file
  file: 'full/path/to/file.svelte',

  // or provide string content and the filename,
  content: '<script> ... </script> Svelte file',
  filename: 'App.svelte',
});
```

### CLI

Make sure your package.json has an entrypoint in the `svelte` field and then run this command to generate type definitions in the `types` folder. This CLI is only optimized for simple packages, if you have a more complex usecase, please use the JS API to generate types.

```sh
sveltyper types
```

## API Reference

It is just like sveld, but `typedef` can be shared across multiple files.

- [@type](#type)
- [@slot](#slot)
- [@event](#event)
- [@restProps](#restprops)
- [@typedef](#typedef)

### `@type`

Without a `@type` annotation, sveld will infer the primitive type for a prop:

```js
export let kind = 'primary';
// inferred type: "string"
```

Use the `@type` tag to explicitly document the type. In the following example, the `kind` property has an enumerated (enum) type.

Signature:

```js
/**
 * Optional description
 * @type {Type}
 */
```

Example:

```js
/**
 * Specify the kind of button
 * @type {"primary" | "secondary" | "tertiary"}
 */
export let kind = 'primary';
```

### `@slot`

Use the `@slot` tag for typing component slots.

Signature:

```js
/**
 * @slot {Type} [slot name]
 */
```

Example:

```svelte
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
</p>
```

### `@event`

Use the `@event` tag for typing dispatched events. An event name must be specified.

Signature:

```js
/**
 * @event {EventDetail} eventname
 */
```

Example:

```js
/**
 * @event {{ key: string }} button:key
 */

export let key = '';

import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

$: dispatch('button:key', { key });
```

### `@restProps`

sveld can pick up inline HTML elements that `$$restProps` is forwarded to. However, it cannot infer the underlying element for instantiated components.

You can use the `@restProps` tag to explicitly define element tags that `$$restProps` is forwarded to.

Signature:

```js
/**
 * Single element
 * @restProps {tagname}
 *
 * Multiple elements
 * @restProps {tagname-1 | tagname-2 | tagname-3}
 */
```

Example:

```svelte
<script>
  /** @restProps {h1 | button} */
  export let edit = false;

  import Button from "../";
</script>

{#if edit}
  <Button {...$$restProps} />
{:else}
  <h1 {...$$restProps}><slot /></h1>
{/if}
```

### `@typedef`

The `@typedef` tag can be used to define a common type that is used multiple times within a your component and can be shared with multiple files.

Signature:

```js
/**
 * @typedef {Type} TypeName
 */
```

Example:

**A.svelte**

```js
/**
 * @typedef {string} AuthorName
 * @typedef {{ name?: AuthorName; dob?: string; }} Author
 */

/** @type {Author} */
export let author = 'Oda';

/** @type {Author[]} */
export let authors = [];
```

**B.svelte**

```js
/** @type {Author} */
export let whoIsAuthor = 'Murata';
```

## Run tests

```sh
npm t
```

## Author

👤 **TheComputerM**

- Twitter: [@TheComputerM](https://twitter.com/TheComputerM)
- Github: [@TheComputerM](https://github.com/TheComputerM)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/TheComputerM/sveltyper/issues). You can also take a look at the [contributing guide](https://github.com/TheComputerM/sveltyper/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [TheComputerM](https://github.com/TheComputerM).<br />
This project is [MIT](https://github.com/TheComputerM/sveltyper/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
