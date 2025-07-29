import type { Hono } from "hono";
import { router } from "~/trpc/server.ts";
import type { AppContext } from "~/trpc/types.ts";
import { healthCheckHandler, healthProcedures } from "./hc.ts";

export const trpcRouter = router({
  ...healthProcedures,
});

export type TrpcRouter = typeof trpcRouter;

export function setupRoutes(app: Hono<AppContext>) {
  app.get("/api/hc", healthCheckHandler);
}
