/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

const { configure } = require('quasar/wrappers')

module.exports = configure(function (ctx) {
  return {
    supportTS: false,

    boot: [
      'axios'
    ],

    css: [
      'app.sass'
    ],

    extras: [
      'roboto-font',
      'material-icons'
    ],

    build: {
      vueRouterMode: 'hash', // or 'history'
      extendWebpack (cfg) {
        cfg.resolve.alias = {
          ...cfg.resolve.alias,
          pages: path.resolve(__dirname, 'src/pages')
        }
      }
    },

    devServer: {
      https: false,
      port: 8080,
      open: true // abre o navegador automaticamente
    },

    framework: {
      config: {},

      plugins: [
        'Notify'
      ]
    }
  }
})
