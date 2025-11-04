import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Update this with your GitHub repo name
export default defineConfig({
  plugins: [react()],
  base: '/AquaScore/',
});
