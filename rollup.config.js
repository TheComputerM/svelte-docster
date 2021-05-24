import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/esm/index.js',
      format: 'esm',
    },
    {
      file: 'dist/cjs/index.js',
      format: 'cjs',
      exports: 'default',
    },
  ],
  plugins: [nodeResolve(), terser()],
  external: ['svelte/compiler', 'comment-parser/lib'],
};
