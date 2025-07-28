import type { Hono } from "hono";
import { router } from "~/trpc/server.ts";
import type { AppContext } from "~/trpc/types.ts";
import {
  getInfoHandler,
  healthCheckHandler,
  healthProcedures,
} from "./health.ts";

export const trpcRouter = router({
  ...healthProcedures,
});

export type TrpcRouter = typeof trpcRouter;

export function setupRoutes(app: Hono<AppContext>) {
  app.get("/", getInfoHandler);
  app.get("/hc", healthCheckHandler);
}
