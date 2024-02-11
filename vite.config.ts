import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { plugin as mdPreprocessor, Mode } from 'vite-plugin-markdown';

export default defineConfig({
  plugins: [sveltekit(), mdPreprocessor({
    mode: [Mode.HTML]
  })],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
});
