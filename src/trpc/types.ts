import type { Handler } from "hono";

import type { TRPCClient } from "./client.ts";

export type AppVariables = {
  trpcClient: TRPCClient;
};

export type AppContext = {
  Variables: AppVariables;
};

export type RouteHandler = Handler<AppContext>;
