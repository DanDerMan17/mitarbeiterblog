
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    watch: false,
    hookTimeout: 30000,
    testTimeout: 20000,
    reporters: ['default'],
  },
});
