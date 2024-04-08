import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import {resolve} from "path";

const root = resolve(__dirname, "./src");

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
    find: "@", replacement: resolve(__dirname, "./src") ,
      "componenets": resolve(root, "components"),
      "api": resolve(root, "api"),
      "assets": resolve(root, "assets"),
      "types": resolve(root, "types"),
      "utils": resolve(root, "utils"),
      "views": resolve(root, "views")
    },
  },
  define: {
    "process.env": { BASE_URL: "http://localhost:3000/",},
  },
  plugins: [react()],
})
