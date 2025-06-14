const { defineConfig } = require("cypress");
const browserify = require("@cypress/browserify-preprocessor");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  preprendTransformerToOptions,
} = require("@badeball/cypress-cucumber-preprocessor/browserify");

async function setupNodeEvents(on, config) {
  // implement node event listeners here
  //require("cypress-mochawesome-reporter/plugin")(on);
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    browserify(preprendTransformerToOptions(config, browserify.defaultOptions))
  );

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  //projectId: "w7yu43",
  reporter: "cypress-mochawesome-reporter",
  env: {
    url: "https://rahulshettyacademy.com/",
  },

  retries: {
    runMode: 1,
  },
  e2e: {
    specPattern: "cypress/integration/examples/*.js",
    //baseUrl: "https://rahulshettyacademy.com/",
    setupNodeEvents,
  },
});
