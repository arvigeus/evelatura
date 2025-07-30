import type { Hono } from "hono";
import { router } from "~/trpc/server.ts";
import type { AppContext } from "~/trpc/types.ts";
import { healthCheckHandler, healthProcedures } from "./hc.ts";
import {
  getUsersHandler,
  createUserHandler,
  usersProcedures,
} from "./users.ts";
import { greetingsHandler } from "./greetings.ts";

export const trpcRouter = router({
  ...healthProcedures,
  ...usersProcedures,
});

export type TrpcRouter = typeof trpcRouter;

export function setupRoutes(app: Hono<AppContext>) {
  app.get("/hc", healthCheckHandler);
  app.get("/users", getUsersHandler);
  app.post("/users", createUserHandler);
  greetingsHandler(app, "/greetings");
}
