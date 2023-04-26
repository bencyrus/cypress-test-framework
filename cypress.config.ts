import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
    },
    baseUrl: "http://automationexercise.com",
    viewportWidth: 1920,
    viewportHeight: 1080,
    reporter: "cypress-mochawesome-reporter",
    video: false,
    defaultCommandTimeout: 10000,
    testIsolation: false
  },
});
