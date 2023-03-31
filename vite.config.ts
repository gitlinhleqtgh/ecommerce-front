// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [reactRefresh()],
    css: { modules: { localsConvention: "camelCase" } },

    define: {
      "process.env": {
        REACT_APP_API_URL: env.REACT_APP_API_URL,
        GOOGLE_CLIENT_ID: env.GOOGLE_CLIENT_ID,
      },
    },
  };
});
