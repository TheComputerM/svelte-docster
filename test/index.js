const path = require("path");
const { readFileSync } = require("fs");

import doc from "../src/index";
import tsdoc from "../src/typescript";

import { test } from "uvu";
import * as assert from "uvu/assert";

const files = [
  "events/dispatch",
  "events/forwarding",
  "events/not.forward",
  "module/basic",
  "others/basic",
  "others/bad.style.tag",
  "props/another.var",
  "props/change.name",
  "props/const",
  "props/export.notfound",
  "props/function",
  "props/let",
  "props/multiple.export",
  "props/no.default",
  "props/singleline.comment",
  "props/tags",
  "restProps/custom",
  "restProps/default",
  "slots/default",
  "slots/named",
  "slots/props",
  "styles/basic",
  "styles/combined",
  "typedef/basic",
];

const tsfiles = ["basic"];

files.forEach((file) => {
  const name = path.join(__dirname, "fixtures", `${file}.svelte`);
  const input = JSON.stringify(doc({ file: name }), null, 2);
  const output = readFileSync(name.replace(".svelte", ".json")).toString();
  test(file, () => {
    assert.fixture(input, output);
  });
});

tsfiles.forEach((file) => {
  const name = path.join(__dirname, "ts_fixtures", `${file}.svelte`);
  const input = JSON.stringify(tsdoc({ file: name }), null, 2);
  const output = readFileSync(name.replace(".svelte", ".json")).toString();
  test(file, () => {
    assert.fixture(input, output);
  });
});

test.run();
