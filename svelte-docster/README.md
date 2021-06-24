<h1 align="center">svelte-docster</h1>
<p>
  <img alt="Version" src="https://img.shields.io/npm/v/svelte-docster" />
  <a href="https://github.com/TheComputerM/svelte-docster/tree/main/svelte-docster#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/TheComputerM/svelte-docster/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/TheComputerM/svelte-docster/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/TheComputerM/svelte-docster" />
  </a>
  <a href="https://twitter.com/TheComputerM" target="_blank">
    <img alt="Twitter: TheComputerM" src="https://img.shields.io/twitter/follow/TheComputerM.svg?style=social" />
  </a>
</p>

> Generate metadata about your Svelte files from jsdoc.

### 🏠 [Homepage](https://github.com/TheComputerM/svelte-docster/tree/main/svelte-docster#readme)

## Install

This project was created to have something in between sveltedoc-parser and sveld. This project can be used to give simple data on what your svelte file exports.

```sh
npm i -D svelte-docster
```

## Usage

```js
const docster = require('svelte-docster');
//or
import docster from 'svelte-docster';

docster({
  // provide either the full path to the svelte file
  file: 'full/path/to/file.svelte',

  // or provide string content and the filename,
  content: '<script> ... </script> Svelte file',
  filename: 'App.svelte',
});
```

## Output

```ts
{
  props: {
    propName: {
      value: string,
      valueType: 'Literal' | 'Identifier' | 'FunctionDeclaration' | null,
      localName: string,
      kind: 'let' | 'const' | 'function',
      required: boolean,
      description: string,
      tags: [
        {
          tag: string,
          type: string,
          name: string,
          description: string,
        },
        ...
      ]
    },
    ...
  }

  slots: {
    slotName: {
      type: string,
      description: string,
      content: string,
      attributes: {
        attributeName: {
          value: string,
          valueType: string,
        },
        ...
      }
    },
    ...
  },

  events: {
    eventName: {
      eventDetail: string,
      description: string,
      by?: "Element" | "InlineComponent",
      trigger?: string,
    },
    ...
  }

  typedef: {
    typeName: {
      value: string,
      description: string
    },
    ...
  }

  restProps: string,

  styles: {
    styleName: {
      description: string,
      default: string
    },
    ...
  },

  all: [array of all the JSDoc comments in the svelte file.],

  // from context='module'
  module: {
    exportedVariable: {
      value: string,
      valueType: 'Literal' | 'Identifier' | 'FunctionDeclaration' | null,
      localName: string,
      kind: 'let' | 'const' | 'function',
      required: boolean,
      description: string,
      tags: [
        {
          tag: string,
          type: string,
          name: string,
          description: string,
        },
        ...
      ]
    },
    ...
  }
}
```

## TOC

- [Props](#props)
- [Events](#events)
- [Slots](#slots)
- [Styles](#styles)
- [restProps](#restprops)
- [Typedef](#typedef)

### Props

```js
/**
 * This is the prop description.
 * @type {string}
 */
export let propName = 'value';
```

**Output**

```json
{
  "propName": {
    "propName": {
      "value": "'value'",
      "valueType": "Literal",
      "localName": "propName",
      "kind": "let",
      "required": false,
      "description": "This is the prop description.",
      "tags": [
        {
          "tag": "type",
          "type": "string",
          "name": "",
          "description": ""
        }
      ]
    }
  }
}
```

### Events

```js
/**
 * @event {{cool: boolean}} button A very cool event.
 */

<button on:click></button>
```

**Output**

```json
{
  "button": {
    "eventDetail": "{cool: boolean}",
    "description": "A very cool event."
  },
  "click": {
    "eventDetail": "window",
    "description": null,
    "by": "Element",
    "trigger": "button"
  }
}
```

### Slots

```js
/**
 * @slot {{prop1:string;}} default
 * @slot {{i:number;}} repeated
 */

<slot basic="prop" />
{#each Array(10) as _, i}
  <slot name="repeated" {i} />
{/each}
```

**Output**

```json
{
  "default": {
    "type": "{prop1:string;}",
    "description": "",
    "attributes": {
      "basic": {
        "value": "prop",
        "valueType": "Text"
      }
    },
    "content": "<slot basic=\"prop\" />"
  },
  "repeated": {
    "type": "{i:number;}",
    "description": "",
    "attributes": {
      "name": {
        "value": "repeated",
        "valueType": "Text"
      },
      "i": {
        "value": "i",
        "valueType": "AttributeShorthand"
      }
    },
    "content": "<slot name=\"repeated\" {i} />"
  }
}
```

### Styles

```js
/**
 * @style {20px} --some-var Description of CSS variable
 * @style --another-var No default
 */
```

**Output**

```json
{
  "--some-var": {
    "description": "Description of CSS variable",
    "default": "20px"
  },
  "--another-var": {
    "description": "No default",
    "default": ""
  }
}
```

### restProps

```js
/**
 * @restProps {button | h1}
 */
```

**Output**

```json
{
  "restProps": "button | h1"
}
```

### Typedef

```js
/**
 * @typedef {string | boolean} RandomType cats > dogs
 * @typedef {{key1: {key2?: boolean}}} Nested some description
 */
```

**Output**

```json
{
  "RandomType": {
    "value": "string | boolean",
    "description": "cats > dogs"
  },
  "Nested": {
    "value": "{key1: {key2?: boolean}}",
    "description": "some description"
  }
}
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

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/TheComputerM/svelte-docster/issues). You can also take a look at the [contributing guide](https://github.com/TheComputerM/svelte-docster/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [TheComputerM](https://github.com/TheComputerM).<br />
This project is [MIT](https://github.com/TheComputerM/svelte-docster/blob/master/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
