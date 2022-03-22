import ts from 'typescript';
import path from 'path';
import { readFileSync } from 'fs';

import json from '@rollup/plugin-json';
import img from '@rollup/plugin-image';

import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';

import packageJson from './package.json';

const libName = 'cp-charts';

export default [
  {
    input: 'src/index.tsx',
    inlineDynamicImports: true,
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        name: libName,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      json(),
      img(),
      typescript({ tsconfig: './tsconfig.json' }),
      babel({ babelHelpers: 'bundled' }),
      commonjs(),
      terser(),
    ],
  },
  {
    input: 'dist/esm/d/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [
      dts({
        compilerOptions: {
          paths: ts.readConfigFile(
            path.resolve(__dirname, 'tsconfig.json'),
            (p) => readFileSync(p, 'utf8')
          ).config.compilerOptions.paths,
        },
      }),
    ],
  },
];
