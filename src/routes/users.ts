import { type } from "arktype";
import { publicProcedure } from "~/trpc/server.ts";
import type { RouteHandler } from "~/trpc/types.ts";

// Example data store (in a real app, this would be a database)
const users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

let nextId = 3;

// tRPC procedures
export const usersProcedures = {
  getUsers: publicProcedure.query(() => {
    return users;
  }),

  getUserById: publicProcedure
    .input(type({ id: "number" }))
    .query(({ input }) => {
      const user = users.find((u) => u.id === input.id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    }),

  createUser: publicProcedure
    .input(
      type({
        name: "string>0",
        email: "string.email",
      })
    )
    .mutation(({ input }) => {
      const newUser = {
        id: nextId++,
        name: input.name,
        email: input.email,
      };
      users.push(newUser);
      return newUser;
    }),
};

// HTTP route handlers
export const getUsersHandler: RouteHandler = async (c) => {
  const trpc = c.get("trpcClient");
  const users = await trpc.getUsers.query();
  return c.json(users);
};

export const createUserHandler: RouteHandler = async (c) => {
  const trpc = c.get("trpcClient");

  try {
    const body = await c.req.json();
    const user = await trpc.createUser.mutate(body);
    return c.json(user, 201);
  } catch (error) {
    return c.json(
      {
        error:
          error instanceof Error
            ? error.message
            : typeof error === "string"
            ? error
            : "Something went wrong",
      },
      400
    );
  }
};
