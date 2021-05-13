const fs = require("fs");
const path = require("path");
const sveltedoc = require("../dist/cjs/index.js");
const glob = require('tiny-glob/sync');

glob('**/*.svelte', {cwd: __dirname}).forEach((example) => {
  const file = path.join(__dirname, example);
  const res = sveltedoc({ file });
  const output = JSON.stringify(res, null, 2);
  fs.writeFileSync(file.replace('.svelte', '.json'), output);
});
