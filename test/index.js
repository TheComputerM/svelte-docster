const glob = require("tiny-glob/sync");
const path = require("path");
const { readFileSync } = require("fs");

import doc from "../src/index";

import { test } from "uvu";
import * as assert from "uvu/assert";

glob("**/*.svelte", { cwd: path.resolve("./test/fixtures") }).forEach(
  (file) => {
    const name = path.join(__dirname, 'fixtures', file);
    const input = JSON.stringify(doc({ file: name }), null, 2);
    const output = readFileSync(name.replace(".svelte", ".json")).toString();
    test(file, () => {
      assert.fixture(input, output);
    });
  }
);

test.run();
