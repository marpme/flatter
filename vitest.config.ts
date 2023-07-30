import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: './test.setup.ts',
    environment: 'jsdom',

    mockReset: true,
    clearMocks: true,
    coverage: {
      all: true,
      reporter: ['text', 'lcov'],
      include: ['components/**', 'lib/**', 'pages/**'],
    },
  },
})
