import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // This exposes the process.env.API_KEY to the client-side code during build
      // WARNING: This exposes your key in the public bundle. 
      // For production, consider using a proxy server.
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});