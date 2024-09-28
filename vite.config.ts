import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import eslintPlugin from "vite-plugin-eslint";
// @ts-ignore
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), eslintPlugin()],
  define: {
    // Disable the hydration mismatch details in production for better tree-shaking
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
  publicDir: path.resolve(__dirname, "./src/static"),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./src"),
      primeicons: "node_modules/primeicons",
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // Splits vendor dependencies into a separate chunk
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase the warning limit to 1MB
  },
  // optimizeDeps: {
  //   include: ['~/../public/TradingView/charting_library/charting_library.min.js']
  // }
});
