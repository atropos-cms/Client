import NuxtConfiguration from '@nuxt/config'
import pkg from './package.json'

const config: NuxtConfiguration = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~/assets/style/app.sass'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/atropos',
    '@/plugins/vue-i18n',
    '@/plugins/vuetify',
    '@/plugins/vuelidate'
  ],

  /*
   ** Router
   */
  router: {
    middleware: 'authenticated'
  },

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/apollo'
  ],
  devModules: [
    '@nuxtjs/vuetify'
  ],

  /*
  ** Apollo Configuraiont
  */
  apollo: {
    clientConfigs: {
      default: '~/modules/apollo.ts'
    }
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ['vuetify/lib'],

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.module = config.module || { rules: [] }

      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

export default config
