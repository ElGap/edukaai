export default defineNuxtConfig({
  compatibilityDate: '2026-03-06',
  devtools: { enabled: false },
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt'
  ],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL || './data/edukaai.db',
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
