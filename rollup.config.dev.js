import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import babel from "rollup-plugin-babel";
import serve from "rollup-plugin-serve";
import { terser } from "rollup-plugin-terser";
import json from '@rollup/plugin-json';

export default {
  input: ["src/thermostat-dark-card.ts"],
  output: {
    dir: "./dist",
    format: "es",
  },
  plugins: [
    resolve(),
    typescript({ sourceMap: true }),
    json(),
    babel({
      exclude: "node_modules/**",
    }),
    terser(),
    serve({
      contentBase: ["./dist", "./demo"],
      host: "0.0.0.0",
      port: process.env.PORT ? Number(process.env.PORT) : 5000,
      allowCrossOrigin: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }),
  ],
};
