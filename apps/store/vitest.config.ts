import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';

import {
  defineConfig,
  configDefaults,
  coverageConfigDefaults,
} from 'vitest/config';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));
const optimizeDepsInclude = [
  '@testing-library/jest-dom/matchers',
  'vitest-matchmedia-mock',
];

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    coverage: {
      exclude: [
        '**/*.config.{?(c|m)js,ts}',
        '**/*.stories*.{ts,tsx}',
        '**/types.ts',
        'storybook-static/**/*.*',
        'stories/**/*.*',
        'lighthouserc.js',
        'setupTests.ts',
        ...coverageConfigDefaults.exclude,
      ],
    },
    projects: [
      {
        plugins: [react()],
        optimizeDeps: {
          include: optimizeDepsInclude,
        },
        test: {
          name: 'integration-only',
          include: ['__integration__/**/*.{test,spec}.{js,ts,jsx,tsx}'],
          browser: {
            enabled: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium' }],
          },
          exclude: [
            ...configDefaults.exclude,
            '**/**.config.{?(c|m)js,ts}',
            'setupTests.ts',
          ],
          setupFiles: ['./vitestSetup-integration.tsx'],
        },
        resolve: {
          alias: {
            '@': path.resolve(__dirname, './'),
          },
        },
      },
      {
        plugins: [react()],
        optimizeDeps: {
          include: optimizeDepsInclude,
        },
        test: {
          name: 'main',
          browser: {
            enabled: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium' }],
          },
          exclude: [
            ...configDefaults.exclude,
            '__integration__/**/*.{test,spec}.{js,ts,jsx,tsx}',
            '**/**.config.{?(c|m)js,ts}',
            'setupTests.ts',
          ],
          setupFiles: ['./vitestSetup.tsx'],
        },
        resolve: {
          alias: {
            '@': path.resolve(__dirname, './'),
          },
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({ configDir: path.join(dirname, '.storybook') }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
