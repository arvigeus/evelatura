import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { TrpcRouter } from "~/routes/mod.ts";
import { config } from "~/env.ts";

export function createTRPCClient() {
  return createTRPCProxyClient<TrpcRouter>({
    links: [
      httpBatchLink({
        url: `${config.baseUrl}/trpc`,
        headers: () => ({
          "user-agent": "api-server",
        }),
      }),
    ],
  });
}

export type TRPCClient = ReturnType<typeof createTRPCClient>;
