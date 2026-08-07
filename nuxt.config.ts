export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: {
    enabled: true,
  },

  modules: ['@nuxtjs/i18n'],

  i18n: {
    defaultLocale: 'fa',

    strategy: 'prefix_except_default',

    locales: [
      {
        code: 'fa',
        name: 'فارسی',
        language: 'fa-IR',
        dir: 'rtl',
        file: 'fa.json',
      },
      {
        code: 'en',
        name: 'English',
        language: 'en-US',
        dir: 'ltr',
        file: 'en.json',
      },
    ],

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'artovia_locale',
      redirectOn: 'root',
    },
  },
})