export default defineNuxtConfig({
  compatibilityDate: '2026-03-06',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt'
  ],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL || './data/edukaai.db',
    huggingfaceToken: process.env.HUGGINGFACE_TOKEN,
    huggingfaceUsername: process.env.HUGGINGFACE_USERNAME,
    public: {
      appName: process.env.NUXT_PUBLIC_APP_NAME || 'edukaAI',
      appVersion: process.env.NUXT_PUBLIC_APP_VERSION || '1.0.0'
    }
  },
  nitro: {
    experimental: {
      wasm: true
    }
  },
  // Router configuration
  router: {
    options: {
      linkActiveClass: 'active',
      linkExactActiveClass: 'exact-active'
    }
  }
})
