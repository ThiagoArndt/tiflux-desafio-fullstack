import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    fs: {
      cachedChecks: false
    }
  },
  resolve: {
   
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      api: `${path.resolve(__dirname, "./src/api/")}`,
      assets: `${path.resolve(__dirname, "./src/assets/")}`,
      components: `${path.resolve(__dirname, "./src/components/")}`,
      hooks: `${path.resolve(__dirname, "./src/hooks/")}`,
      services: `${path.resolve(__dirname, "./src/services/")}`,
      store: `${path.resolve(__dirname, "./src/store/")}`,
      types: `${path.resolve(__dirname, "./src/types/")}`,
      utils: `${path.resolve(__dirname, "./src/utils/")}`,
      views: `${path.resolve(__dirname, "./src/views/")}`,
    },
  },
  define: {
    "process.env": { BASE_URL: "http://localhost:3000/",},
  },
  plugins: [react(), svgr({
    svgrOptions: { exportType: 'named', ref: true, svgo: false, titleProp: true },
    include: '**/*.svg',
  })],
})
