import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


import legacy from '@vitejs/plugin-legacy'
import withReactRouter from 'vite-plugin-next-react-router';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from "vite-plugin-svgr";
import history from 'connect-history-api-fallback';
import fs from 'fs'
import path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      }
    }
  },
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11', 'iOS >= 12'],
    }),
    withReactRouter(),
  tsconfigPaths(),
  svgr(),
    {
      name: 'spa-fallback',
      configureServer(server) {
        server.middlewares.use(
          history({
            disableDotRule: true,
            htmlAcceptHeaders: ['text/html', 'application/xhtml+xml'],
          })
        );
      },
      closeBundle: () => {
        const indexPath = path.resolve(__dirname, 'dist/index.html');
        const notFoundPath = path.resolve(__dirname, 'dist/404.html');
        if (fs.existsSync(indexPath)) {
          fs.copyFileSync(indexPath, notFoundPath);
        }
      }
    },],
  resolve: {
    alias: [
      { find: "@components", replacement: "/src/components" },
      { find: "@", replacement: "/src" },
    ],
  }
})
