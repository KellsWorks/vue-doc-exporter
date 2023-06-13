import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path";


export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "VueDocDownloadLibrary",
      fileName: "vue-doc-download",
    },
    rollupOptions: {

      external: ["vue"],
      output: {

        globals: {
          vue: "Vue",
        },
      },
    },
  },
})
