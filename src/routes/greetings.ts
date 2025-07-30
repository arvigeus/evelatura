import { type } from "arktype";
import { arktypeValidator } from "@hono/arktype-validator";
import type { Hono } from "hono";
import type { AppContext } from "~/trpc/types.ts";

// Validation schema for JSON body
const schema = type({
  name: "string>0",
});

// HTTP route handler function
export const greetingsHandler = (app: Hono<AppContext>, path: string) => {
  app.get(path, arktypeValidator("query", schema), (c) => {
    const data = c.req.valid("query");
    return c.json({
      success: true,
      message: `Greetings, ${data.name}`,
    });
  });
};
