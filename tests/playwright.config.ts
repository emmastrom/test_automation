// Configures tests to be run in the desired baseURL, browser etc.

import { PlaywrightTestConfig } from '@playwright/test';
const config: PlaywrightTestConfig = {
  use: {
    baseURL: 'https://www.amazon.com',
    browserName: 'chromium',
    headless: true,
  },
};
export default config;