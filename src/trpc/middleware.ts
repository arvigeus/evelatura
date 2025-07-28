import type { MiddlewareHandler } from "hono";
import type { AppContext } from "./types.ts";
import { createTRPCClient } from "./client.ts";

const trpcClient = createTRPCClient();

export const injectTRPCClient: MiddlewareHandler<AppContext> = async (
  c,
  next,
) => {
  c.set("trpcClient", trpcClient);
  await next();
};
