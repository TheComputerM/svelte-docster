const glob = require("tiny-glob/sync");
const path = require("path");
const { readFileSync } = require("fs");

import doc from "../src/index";
import tsdoc from "../src/typescript";

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

glob("**/*.svelte", { cwd: path.resolve("./test/ts_fixtures") }).forEach(
  (file) => {
    const name = path.join(__dirname, "ts_fixtures", file);
    const input = JSON.stringify(tsdoc({ file: name }), null, 2);
    const output = readFileSync(name.replace(".svelte", ".json")).toString();
    test(file, () => {
      assert.fixture(input, output);
    });
  }
);

test.run();
