import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import weatherHandler from "./api/weather.js";

function localWeatherApi() {
  return {
    name: "local-weather-api",
    configureServer(server) {
      server.middlewares.use(
        "/api/weather",
        async (request, response, next) => {
          const requestUrl = new URL(request.url || "/", "http://localhost");
          let statusCode = 200;
          const apiResponse = {
            setHeader(name, value) {
              response.setHeader(name, value);
            },
            status(code) {
              statusCode = code;
              return this;
            },
            json(body) {
              response.statusCode = statusCode;
              response.setHeader("Content-Type", "application/json");
              response.end(JSON.stringify(body));
            },
          };

          try {
            await weatherHandler(
              {
                method: request.method,
                query: Object.fromEntries(requestUrl.searchParams),
              },
              apiResponse,
            );
          } catch (error) {
            next(error);
          }
        },
      );
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  if (env.VITE_API_KEY) process.env.VITE_API_KEY = env.VITE_API_KEY;

  return {
    envPrefix: [],
    plugins: [react(), localWeatherApi()],
  };
});
