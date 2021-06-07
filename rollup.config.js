import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.mjs',
      format: 'esm',
    },
    {
      file: 'dist/index.cjs',
      format: 'cjs',
      exports: 'default',
    },
  ],
  plugins: [nodeResolve(), terser()],
  external: ['svelte/compiler'],
};
