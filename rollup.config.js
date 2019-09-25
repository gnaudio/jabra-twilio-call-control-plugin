import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import external from "rollup-plugin-peer-deps-external";
import commonjs from "rollup-plugin-commonjs";
import { terser } from "rollup-plugin-terser";

import pkg from "./package.json";

const name = pkg.name.split("/").pop();

export default {
  input: "src/index.js",
  output: [
    {
      file: `dist/${name}.cjs.js`,
      format: "cjs",
      sourcemap: true
    },
    {
      file: `dist/${name}.esm.js`,
      format: "esm",
      sourcemap: true
    }
  ],

  plugins: [
    external({
      includeDependencies: true
    }),
    resolve(),
    babel({
      presets: ["@babel/preset-env", "@babel/preset-react"],
      plugins: ["@babel/plugin-proposal-class-properties"],
      exclude: "node_modules/**"
    }),
    commonjs(),
    terser()
  ]
};
