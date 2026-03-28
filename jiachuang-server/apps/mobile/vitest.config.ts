import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: {
      '@jiachuang/shared': path.resolve(__dirname, '../../packages/shared/src'),
      'react-native': path.resolve(__dirname, './src/test/react-native-stub.tsx'),
    },
  },
})
