import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // 👇 IMPORTANT: change "hackthon-project" to your repo name
  base: '/hackthon-project/',
});
