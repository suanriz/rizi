import { defineVitestProject } from '@nuxt/test-utils/config'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          include: ['test/unit/**/*.test.ts', 'test/unit/**/*.spec.ts'],
          environment: 'node',
        },
      },
      await defineVitestProject({
        test: {
          name: 'nuxt',
          include: ['test/nuxt/**/*.test.ts', 'test/nuxt/**/*.spec.ts'],
          environment: 'nuxt',
        },
      }),
    ],
    coverage: {
      provider: 'v8',
      include: ['app/utils/tool.ts', 'app/utils/simulation/*.ts', 'app/stores/**/*.ts'],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
      reporter: ['text', 'json', 'html', 'lcov'],
    },
  },
})
