import { createApp } from "./app.ts";
import { config } from "~/env.ts";

function startServer() {
  const app = createApp();

  console.log(`🚀 API Server starting...`);
  console.log(`📍 Environment: ${config.denoEnv}`);
  console.log(`🌐 Server URL: ${config.baseUrl}`);
  console.log(`📊 tRPC: ${config.baseUrl}/trpc`);

  return Deno.serve({
    port: config.port,
    hostname: config.host === "localhost" ? "0.0.0.0" : config.host,
  }, app.fetch);
}

if (import.meta.main) {
  startServer();
}
