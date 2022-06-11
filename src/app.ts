import { createServer } from "@graphql-yoga/node";
import { PrismaClient } from "@prisma/client";
import express from "express";

import { default as typeDefs } from "./typeDefs";
import resolvers from "./resolvers";

const prisma = new PrismaClient();

export const AppServer = () => {
  // Express server
  const app = express();

  // GraphQL-Yoga server
  const graphQLServer = createServer({
    context: ({ request }) => ({
      prisma,
      request,
    }),
    schema: {
      typeDefs,
      resolvers,
    },
  });

  app.use("/", graphQLServer);

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", [
      process.env.GROOMZY_FRONTEND_URL,
    ]);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  return app;
};
