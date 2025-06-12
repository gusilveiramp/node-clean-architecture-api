import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import jest from "eslint-plugin-jest";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";

export default [
  {
    ignores: ["dist/"], // evita que o ESLint analise arquivos compilados.
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.node } }, // Habilita variáveis globais do node (process, etc)
  pluginJs.configs.recommended, // Carrega as regras recomendadas básicas do ESLint. Essencial para qualquer projeto JavaScript.
  ...tseslint.configs.recommended, // Habilita as boas práticas para TypeScript.
  {
    // aplica configurações do Jest apenas na pasta src/tests/ e ajusta uma regra.
    files: ["src/**/*.{test,spec}.ts"], // Aplica configurações específicas para arquivos de teste
    ...jest.configs["flat/recommended"], // Carrega regras recomendadas do plugin Jest
    rules: {
      ...jest.configs["flat/recommended"].rules,
      "jest/prefer-expect-assertions": "off", // Desativa a exigência de sempre usar expect() em testes
    },
  },
  {
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_", // ← ignora parâmetros como _req, _next
          varsIgnorePattern: "^_", // ← ignora variáveis como _unused
        },
      ],
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
    },
  },
  // Ativa o plugin prettier, aplica a regra "prettier/prettier": "error" e garante que o ESLint mostre erros de formatação Prettier diretamente
  eslintPluginPrettierRecommended,
];
