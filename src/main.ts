import { createServer } from "~/server.ts";
import { config } from "~/env.ts";

const app = createServer();

console.log(`📍 Environment: ${config.denoEnv}`);
console.log(`🌐 Server: ${config.baseUrl}`);
console.log(`📊 tRPC: ${config.baseUrl}/trpc`);

export default app;
