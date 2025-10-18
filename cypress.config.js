const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retries: {
    runMode: 1,
    openMode: 0,  
  },
  e2e: {
    setupNodeEvents(on, config) {
    require('cypress-mochawesome-reporter/plugin')(on);
      // implement node event listeners here
    },
  },
});
