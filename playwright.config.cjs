const { defineConfig } = require('@playwright/test');
const path = require('node:path');

module.exports = defineConfig({
  testDir: './tests/e2e',
  workers: 1,
  retries: process.env.CI ? 2 : 0,

  use: {
    baseURL: 'http://127.0.0.1:3000',
    browserName: 'chromium',
    screenshot: 'only-on-failure',
  },

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],

  webServer: {
    command: 'node server.js',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
    env: {
      PORT: '3000',
      DB_FILE: path.join(__dirname, 'data', 'ci-e2e.db'),
    },
  },
});