import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@Components': path.resolve(__dirname, 'src/components'),
      '@Hooks': path.resolve(__dirname, 'src/hooks'),
      '@Services': path.resolve(__dirname, 'src/services'),
      '@Pages': path.resolve(__dirname, 'src/pages'),
    }
  }
});
