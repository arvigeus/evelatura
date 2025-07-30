import devServer from "@hono/vite-dev-server";
import { defineConfig } from "vite";
import deno from "@deno/vite-plugin";

export default defineConfig(() => {
  return {
    plugins: [
      deno(),
      devServer({
        entry: "src/main.ts",
      }),
    ],
  };
});
