# API Server

A modern TypeScript API server built with Hono and tRPC, designed for type
safety and developer experience.

## Architecture

### Tech Stack

- **Runtime**: Deno
- **Web Framework**: Hono
- **RPC Framework**: tRPC with Hono adapter
- **Build Tool**: Vite
- **Validation**: ArkType

### Project Structure

```txt
src/
├── trpc/              # tRPC infrastructure
│   ├── server.ts      # tRPC server setup (procedures, router, middleware)
│   ├── client.ts      # tRPC client factory
│   ├── middleware.ts  # Hono middleware for tRPC client injection
│   ├── types.ts       # App context and variable types
├── routes/            # Route definitions
│   ├── mod.ts         # Central API router exports (tRPC + HTTP)
│   └── *.ts           # Individual API route files (co-located tRPC + HTTP)
├── env.ts             # Environment configuration
├── main.ts            # Application entry point
└── server.ts          # Hono server factory with middleware setup
```

## Key Features

### Unified Route Architecture

Each route file contains both tRPC procedures and HTTP handlers:

- **tRPC procedures**: Type-safe RPC endpoints with validation
- **HTTP handlers**: Traditional REST endpoints for health checks, etc.
- **Co-location**: Related functionality lives together

### Type Safety

- **End-to-end**: Shared types between client and server
- **Context injection**: tRPC client available in HTTP handlers
- **Validation**: ArkType for runtime type checking
- **Import aliases**: Clean imports with `~/` prefix

### Development Experience

- **Hot reload**: Deno's built-in file watching
- **Environment-based**: Different behavior for dev/prod
- **Error handling**: Detailed errors in development, generic in production
- **Logging**: Request logging in development mode

## Configuration

Environment variables:

- `PORT` - Server port (default: 5174)
- `HOST` - Server host (default: localhost)
- `DENO_ENV` - Environment mode (default: development)
- `BASE_URL` - Override base URL for tRPC client

## Getting Started

```bash
# Start development server
deno task dev

# Server will be available at:
# HTTP: http://localhost:5174
# tRPC: http://localhost:5174/trpc
```

## Adding New Routes

1. Create `src/routes/feature.ts`:

```ts
import { type } from "arktype";
import { arktypeValidator } from "@hono/arktype-validator";
import { publicProcedure } from "~/trpc/server.ts";
import type { Hono } from "hono";
import type { AppContext, RouteHandler } from "~/trpc/types.ts";

// tRPC procedures
export const featureProcedures = {
  getData: publicProcedure
    .input(type({ id: "number" }))
    .query(({ input }) => ({ id: input.id, data: "example" })),

  createData: publicProcedure
    .input(type({ name: "string>0" }))
    .mutation(({ input }) => ({ id: 1, name: input.name })),
};

// HTTP handlers - simple handler
export const getFeatureHandler: RouteHandler = async (c) => {
  const trpc = c.get("trpcClient");
  const result = await trpc.getData.query({ id: 1 });
  return c.json(result);
};

// HTTP handlers - with validation middleware (function-based)
const schema = type({ name: "string>0" });

export const createFeatureHandler = (app: Hono<AppContext>, path: string) => {
  app.post(path, arktypeValidator("json", schema), (c) => {
    const data = c.req.valid("json");
    return c.json({
      success: true,
      message: `Created ${data.name}`,
    });
  });
};
```

2. Register in `src/routes/mod.ts`:

```ts
import {
  featureProcedures,
  getFeatureHandler,
  createFeatureHandler,
} from "./feature.ts";

// Add tRPC procedures
export const trpcRouter = router({
  ...healthProcedures,
  ...featureProcedures,
});

export function setupRoutes(app: Hono<AppContext>) {
  app.get("/feature", getFeatureHandler);
  createFeatureHandler(app, "/feature");
}
```
