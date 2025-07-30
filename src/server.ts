import { Hono } from "hono";
import { trpcServer } from "@hono/trpc-server";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import type { AppContext } from "~/trpc/types.ts";
import { setupRoutes, trpcRouter } from "~/routes/mod.ts";
import { injectTRPCClient } from "~/trpc/middleware.ts";
import { config } from "~/env.ts";

export function createServer() {
  const app = new Hono<AppContext>();

  if (config.isDevelopment) {
    app.use("*", logger());
  }

  app.use(
    "*",
    cors({
      origin: config.isDevelopment ? "*" : [],
      credentials: true,
    })
  );

  app.use("*", injectTRPCClient);

  app.use(
    "/trpc/*",
    trpcServer({
      router: trpcRouter,
    })
  );

  setupRoutes(app);

  app.notFound((c) => {
    return c.json({ error: "Not Found", status: 404 }, 404);
  });

  app.onError((err, c) => {
    console.error("Application error:", err);
    return c.json(
      {
        error: config.isDevelopment ? err.message : "Internal Server Error",
        status: 500,
      },
      500
    );
  });

  return app;
}
