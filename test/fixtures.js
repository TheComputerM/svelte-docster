const glob = require("tiny-glob/sync");
const path = require("path");
const sveltedoc = require("../dist/index.cjs");
const sveltedocts = require('../dist/typescript.cjs');
const { writeFileSync } = require("fs");

glob("./test/fixtures/**/*.svelte", {}).forEach((file) => {
  const name = path.resolve(file);
  const output = sveltedoc({ file: name });
  writeFileSync(
    name.replace(".svelte", ".json"),
    JSON.stringify(output, null, 2)
  );
});

glob("./test/ts_fixtures/**/*.svelte", {}).forEach((file) => {
  const name = path.resolve(file);
  const output = sveltedocts({ file: name });
  writeFileSync(
    name.replace(".svelte", ".json"),
    JSON.stringify(output, null, 2)
  );
});
