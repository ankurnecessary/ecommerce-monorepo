import { nextJsConfig } from "../../packages/eslint-config/next.js";
import { globalIgnores } from "eslint/config";

export default [
  ...nextJsConfig,
  globalIgnores(["storybook-static/**"]),
];
