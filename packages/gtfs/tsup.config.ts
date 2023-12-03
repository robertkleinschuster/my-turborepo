import { defineConfig, type Options } from "tsup";

module.exports = defineConfig((options: Options) => ({
  entry: ["src/index.ts"],
  clean: true,
  dts: true,
  format: ["cjs", "esm"],
  ...options,
}));
