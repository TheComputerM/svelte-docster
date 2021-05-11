import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/index.js",
    output: [
      {
        file: "dist/index.js",
        format: "esm",
      },
      {
        file: "dist/index.cjs",
        format: "cjs",
        exports: "default",
      },
    ],
    plugins: [nodeResolve(), terser()],
    external: ["svelte/compiler", "comment-parser/lib"],
  },
  {
    input: "src/typescript.js",
    output: [
      {
        file: "dist/typescript.js",
        format: "esm",
      },
      {
        file: "dist/typescript.cjs",
        format: "cjs",
        exports: "default",
      },
    ],
    plugins: [nodeResolve(), terser()],
    external: ["svelte2tsx", "./index", "sucrase"],
  },
];
