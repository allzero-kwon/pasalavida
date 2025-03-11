import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import withReactRouter from 'vite-plugin-next-react-router';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/pasalavida",
  plugins: [react(),
  withReactRouter(),
  tsconfigPaths(),
  svgr()],
  resolve: {
    alias: [
      { find: "@components", replacement: "/src/components" },
      { find: "@", replacement: "/src" },
    ],
  },
})
