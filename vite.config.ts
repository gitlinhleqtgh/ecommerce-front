// vite.config.ts
import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

export default defineConfig({
  plugins: [reactRefresh()],
  css: { modules: { localsConvention: "camelCase" } },

  define: {
    "process.env": { REACT_APP_API_URL: "http://localhost:8000/api" },
  },
});
