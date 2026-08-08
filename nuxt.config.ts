// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: { port: 3001, host: '0.0.0.0' },
  modules: ['@nuxtjs/apollo', '@nuxt/eslint'],
  eslint: {
    config: {
      typescript: {
        tsconfigPath: './tsconfig.json',
      },
    },
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint:
          process.env.GRAPHQL_ENDPOINT ?? 'http://localhost:3000/graphql',
        browserHttpEndpoint:
          process.env.GRAPHQL_BROWSER_ENDPOINT ??
          'http://localhost:3000/graphql',
      },
    },
  },
});
