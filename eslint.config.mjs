// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import unusedImports from 'eslint-plugin-unused-imports';
import vueA11y from 'eslint-plugin-vuejs-accessibility';

export default withNuxt(
  { ignores: ['eslint.config.mjs', 'commitlint.config.js'] },
  ...vueA11y.configs['flat/recommended'],
  eslintPluginPrettierRecommended,
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      // Règle Vue 2 uniquement (interdit les templates multi-racines), obsolète
      // depuis que Vue 3 les supporte nativement — vue/valid-template-root suffit.
      'vue/no-multiple-template-root': 'off',
      'vue/no-unused-properties': 'error',
      'vue/component-name-in-template-casing': 'error',
      'vuejs-accessibility/label-has-for': [
        'error',
        {
          required: {
            some: ['nesting', 'id'],
          },
        },
      ],
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },
);
