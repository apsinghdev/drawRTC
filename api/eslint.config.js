import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {languageOptions: { globals: { ...globals.node, ...globals.browser } }},
  pluginJs.configs.recommended,
];