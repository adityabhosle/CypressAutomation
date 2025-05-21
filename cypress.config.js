const { defineConfig } = require("cypress");

module.exports = defineConfig({
  //projectId: "w7yu43",
  reporter: "cypress-mochawesome-reporter",

  retries: {
    runMode: 1,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/integration/examples/*.js",
    baseUrl: "https://rahulshettyacademy.com/",
  },
});
