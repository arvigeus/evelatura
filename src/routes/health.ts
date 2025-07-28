import { type } from "arktype";
import { publicProcedure } from "~/trpc/server.ts";
import type { RouteHandler } from "~/trpc/types.ts";

// tRPC procedures
export const healthProcedures = {
  hello: publicProcedure.input(type("string | null")).query(({ input }) => {
    return `Hello ${input ?? "World"}!`;
  }),
};

// HTTP route handlers
export const healthCheckHandler: RouteHandler = async (c) => {
  const trpc = c.get("trpcClient");
  const result = await trpc.hello.query("API Server");

  return c.json({
    status: "ok",
    message: result,
    timestamp: new Date().toISOString(),
  });
};

export const getInfoHandler: RouteHandler = (c) => {
  return c.json({
    name: "API Server",
    version: "1.0.0",
  });
};
