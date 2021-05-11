<h1 align="center">Welcome to svelte-docster 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/npm/v/svelte-docster" />
  <a href="https://github.com/TheComputerM/svelte-docster#readme" target="_blank">
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

### 🏠 [Homepage](https://github.com/TheComputerM/svelte-docster#readme)

## Install

This project was created to have something in between sveltedoc-parser and sveld. This project can be used to give simple data on what your svelte file exports.

```sh
npm i -D svelte-docster
```

## Usage

```js
const docster = require("svelte-docster");
//or
import docster from "svelte-docster";

docster({
  // provide either the full path to the svelte file
  file: "full/path/to/file.svelte",

  // or provide string content and the filename,
  content: "<script> ... </script> Svelte file",
  filename: "App.svelte",
});
```

### With TypeScript

```sh
# You also have to install svelte2tsx and sucrase
npm i -D svelte2tsx sucrase
```

```js
const docster = require("svelte-docster/typescript");
//or
import docster from "svelte-docster/typescript";

docster({
  // provide either the full path to the svelte file
  file: "full/path/to/file.svelte",

  // or provide string content and the filename,
  content: "<script> ... </script> Svelte file",
  filename: "App.svelte",
});
```

This add a new field to the output props: `output.props.propName.type`.

## Output

You can see examples in the [examples](./examples) folder. The output structure looks something like this:

```ts
{
  props: {
    propName: {
      value: string,
      valueType: VariableType,
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
      description: string,
      eventDetail: string,
      by: NodeType,
      trigger: string,
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
      default: string,
      type: string
    },
    ...
  },

  all: [array of all the JSDoc comments in the svelte file.],

  // from context='module'
  module: {
    exportedVariable: {
      value: string,
      valueType: VariableType,
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
