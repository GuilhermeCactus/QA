const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return config
    },
    // opcional: caminho para o Chrome se for personalizado
    chromeWebSecurity: false
  },
})
