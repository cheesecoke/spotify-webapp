import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "*"),
      src: path.resolve(__dirname, "src"),
      components: path.resolve(__dirname, "src/components"),
      pages: path.resolve(__dirname, "src/pages"),
      context: path.resolve(__dirname, "src/context"),
      lib: path.resolve(__dirname, "src/lib"),
      hooks: path.resolve(__dirname, "src/hooks"),
      api: path.resolve(__dirname, "src/api"),
      styles: path.resolve(__dirname, "src/styles"),
      assets: path.resolve(__dirname, "src/assets"),
      utils: path.resolve(__dirname, "src/utils"),
      helpers: path.resolve(__dirname, "src/helpers"),
    },
  },
});
