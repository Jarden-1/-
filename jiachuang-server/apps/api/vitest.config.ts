import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['test/**/*.e2e-spec.ts'],
  },
  resolve: {
    alias: {
      // Allow importing the shared package by workspace name in tests
      '@jiachuang/shared': path.resolve(__dirname, '../../packages/shared/src'),
    },
  },
})
