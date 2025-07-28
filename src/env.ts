export const config = {
  port: Number(Deno.env.get("PORT")) || 8000,
  host: Deno.env.get("HOST") || "localhost",
  denoEnv: Deno.env.get("DENO_ENV") || "development",
  get baseUrl() {
    return Deno.env.get("BASE_URL") || `http://${this.host}:${this.port}`;
  },
  get isDevelopment() {
    return this.denoEnv === "development";
  },
  get isProduction() {
    return this.denoEnv === "production";
  },
} as const;
