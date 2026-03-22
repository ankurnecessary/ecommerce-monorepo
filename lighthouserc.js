module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/'],
      startServerCommand: 'pnpm start',
      numberOfRuns: 3,
      settings: {
        throttlingMethod: 'devtools', // Use real-world throttling like DevTools
        // preset: 'desktop',
        emulatedFormFactor: 'mobile', // Aligns screen size and interaction model
        "chromeFlags": "--headless --disable-gpu --no-sandbox",
        "port": 9222,
        "disableStorageReset": true
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      // preset: 'lighthouse:recommended',
      assertions: {
        // ✅ Key performance metrics for mobile
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }], // 2s
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'speed-index': ['warn', { maxNumericValue: 3000 }],

        // ✅ High-level category scores
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],

        // ❌ Disable unsupported audits that return NaN
        'lcp-lazy-loaded': 'off',
        'non-composited-animations': 'off',
        'prioritize-lcp-image': 'off',

        // ⚠️ Often fails on mobile layouts — lower or disable
        'target-size': ['warn', { minScore: 0.5 }],

        // Optional: if you bundle or tree-shake heavily
        'unused-javascript': 'off',
      },
    }
  }
};