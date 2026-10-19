import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  // Include older managed desktop browsers without extra runtime dependencies.
  build: {
    target: ['chrome100', 'edge100', 'firefox102'],
    rollupOptions: {
      input: { deck: 'index.html', references: 'references.html' },
    },
  },
});
