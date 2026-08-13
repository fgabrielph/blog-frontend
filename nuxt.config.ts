export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt-auth-sanctum', '@nuxt/a11y'],
  css: ['~/assets/css/main.css'],
  future: {
    compatibilityVersion: 4,
  },

  runtimeConfig: {
    public: {
      apiBase: ''
    }
  },

  sanctum: {
    baseUrl: process.env.NUXT_PUBLIC_API_BASE,
    mode: "token",

    endpoints: {
      login: '/api/login',
      logout: '/api/logout',
      user: '/api/profile'
    },

    client: {
      initialRequest: true 
    },
    redirect: {
      keepRequestedRoute: true,
      onAuthOnly: '/auth/login',
      onLogin: '/blogs',
      onLogout: '/auth/login',
      onGuestOnly: '/blogs'
    },
  },
})