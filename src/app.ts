import { PrismaClient } from "@prisma/client";
import express from "express";

import { default as typeDefs } from "./typeDefs";
import resolvers from "./resolvers";
import { createYoga } from "graphql-yoga";
import { schema } from "./schema";
import path from "path";

// Instatiate prisma client
const prisma = new PrismaClient();

// Instantiate Yoga with a GraphQL schema.
const yoga = createYoga({
  context: ({ request }) => ({
    prisma,
    request,
  }),
  schema,
  graphqlEndpoint: "/",
});

export const AppServer = () => {
  // Express server
  const app = express();

  //Enabling CORS
  // app.use((req, res, next) => {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  //   );
  //   next();
  // });

  app.get("/media-logo", (req, res) => {
    // Get the data request
    const notFound = {
      message: "Logo not found.",
      success: false,
    };

    // Internal server error
    const internalServerError = {
      message: "There has been an internal server error while retrieving logo.",
      success: false,
    };

    // Get the base path if exist
    const basePath = `${__dirname}/assets/images`;

    // Form a full path for the image location
    const fullPath = path.join(basePath, "media-logo.png");

    // Download the profile picture.
    res.download(fullPath, (err) => {
      console.log(err);
      if (err) {
        if (!res.headersSent) {
          res.status(500).send(internalServerError);
        } else {
          res.end();
        }
      }
    });
  });

  app.use("/", yoga);

  return app;
};
