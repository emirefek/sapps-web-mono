import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: "../../",
  resolve: {
    alias: {
      "@server": "../../server",
    },
  },
  preview: {
    port: 8080,
    cors: {
      origin: "*",
    },
  },
});
