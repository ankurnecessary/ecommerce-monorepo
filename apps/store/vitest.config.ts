import path from 'node:path';
import react from '@vitejs/plugin-react';

import {
  defineConfig,
  configDefaults,
  coverageConfigDefaults,
} from 'vitest/config';

const optimizeDepsInclude = [
  '@testing-library/jest-dom/matchers',
  'vitest-matchmedia-mock',
];

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',
      exclude: [
        '**/*.config.{?(c|m)js,ts}',
        '**/types.ts',
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
    ],
  },
});
