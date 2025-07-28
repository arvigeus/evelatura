# API Server

A modern TypeScript API server built with Hono and tRPC, designed for type
safety and developer experience.

## Architecture

### Tech Stack

- **Runtime**: Deno
- **Web Framework**: Hono
- **RPC Framework**: tRPC with Hono adapter
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
│   ├── mod.ts         # Central router exports (tRPC + HTTP)
│   └── *.ts           # Individual route files (co-located tRPC + HTTP)
├── env.ts             # Environment configuration
├── app.ts             # Hono app setup with middleware
└── main.ts            # Server entry point
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

- `PORT` - Server port (default: 8000)
- `HOST` - Server host (default: localhost)
- `DENO_ENV` - Environment mode (default: development)
- `BASE_URL` - Override base URL for tRPC client

## Getting Started

```bash
# Start development server
deno task dev

# Server will be available at:
# HTTP: http://localhost:8000
# tRPC: http://localhost:8000/trpc
```

## Adding New Routes

1. Create `src/routes/feature.ts`:

```ts
import { type } from "arktype";
import { publicProcedure } from "~/trpc/server.ts";
import type { RouteHandler } from "~/trpc/types.ts";

// tRPC procedures
export const featureProcedures = {
  getData: publicProcedure.query(() => ({ data: "example" })),
};

// HTTP handlers
export const getFeature: RouteHandler = (c) => {
  return c.json({ feature: "data" });
};
```

1. Register in `src/routes/mod.ts`:

```ts
import { featureProcedures, getFeature } from "./feature.ts";

export const appRouter = router({
  ...healthProcedures,
  ...featureProcedures, // Add tRPC procedures
});

routes.get("/feature", getFeature); // Add HTTP route
```
