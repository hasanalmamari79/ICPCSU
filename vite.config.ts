import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves the site from https://<user>.github.io/<repo>/
// The repo is "ICPCSU", so the base path is "/ICPCSU/".
// - Using a custom domain or a <user>.github.io repo? set BASE_PATH=/ when building.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/ICPCSU/',
  plugins: [react()],
  build: { target: 'es2020', cssCodeSplit: true },
});
