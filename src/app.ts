import { createPubSub, createServer } from "@graphql-yoga/node";
import { PrismaClient } from "@prisma/client";
import express from "express";

import { default as typeDefs } from "./typeDefs";
import resolvers from "./resolvers";

const prisma = new PrismaClient();
const pubSub = createPubSub();

export const AppServer = () => {
  // Express server
  const app = express();

  // GraphQL-Yoga server
  const graphQLServer = createServer({
    context: ({ request }) => ({
      prisma,
      pubSub,
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

// import { createServer, createPubSub } from "@graphql-yoga/node";
// import { PrismaClient } from "@prisma/client";
// import { default as typeDefs } from "./typeDefs";
// import resolvers from "./resolvers";
// import path from "path";
// import express from "express";

// const prisma = new PrismaClient();
// const pubSub = createPubSub();

// // Express server
// const app = express();

// // GraphQL-Yoga server
// const graphQLServer = () => {
//   const server = createServer({
//     context: ({ request }) => ({
//       prisma,
//       pubSub,
//       request,
//     }),
//     schema: {
//       typeDefs,
//       resolvers,
//     },
//   });

//   return server;
// };

// app.use("/", graphQLServer);

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Origin", [process.env.GROOMZY_FRONTEND_URL]);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// app.get("/?/profile/:filename", (req, res) => {
//   // Get the data request
//   const notFound = {
//     message: "The requested file does not exist.",
//     success: false,
//   };

//   // Internal server error
//   const internalServerError = {
//     message:
//       "There has been an internal server error while retrieving a profile picture.",
//     success: false,
//   };

//   // Get all the params from the request
//   const { filename } = req.params;

//   // Get the base path if exist
//   const basePath = process.env.GROOMZY_IMAGES_BASE_DIR || "";

//   // Form a full path for the image location
//   const fullPath = path.join(`${basePath}/profile`, filename);

//   // Download the profile picture.
//   res.download(fullPath, (err) => {
//     console.log(err);
//     if (err) {
//       if (!res.headersSent) {
//         res.status(500).send(internalServerError);
//       } else {
//         res.end();
//       }
//     }
//   });
// });

// app.get("/?/gallery/:filename", (req, res) => {
//   // Get the image
//   const notFound = {
//     message: "The requested image does not exist.",
//     success: false,
//   };

//   // Internal server error
//   const internalServerError = {
//     message:
//       "There has been an internal server error while retrieving gallery image.",
//     success: false,
//   };

//   // Get all the params from the request
//   const { filename } = req.params;

//   // Get the base path if exist
//   const basePath = process.env.GROOMZY_IMAGES_BASE_DIR || "";

//   // Form a full path for the image location
//   const fullPath = path.join(`${basePath}/gallery`, filename);

//   // Download the gallery image.
//   res.download(fullPath, (err) => {
//     if (err) {
//       if (!res.headersSent) {
//         res.status(500).send(internalServerError);
//       } else {
//         res.end();
//       }
//     }
//   });
// });

// app.get("/?/tsandcs", (req, res) => {
//   // Get the terms and conditions file
//   const notFound = {
//     message: "The requested terms and conditions file does not exist.",
//     success: false,
//   };

//   // Internal server error
//   const internalServerError = {
//     message:
//       "There has been an internal server error while retrieving terms and conditions.",
//     success: false,
//   };

//   // Get the base path if exist
//   const filePath = process.env.GROOMZY_TERMS_AND_CONDITIONS_BASE_DIR || "";

//   // Download the gallery image.
//   res.download(filePath, (err) => {
//     if (err) {
//       if (!res.headersSent) {
//         res.status(500).send(internalServerError);
//       } else {
//         res.end();
//       }
//     }
//   });
// });

// app.listen(4000, () => {
//   console.log("running...");
// });
// // createServer().start({
// //   cors: {
// //     credentials: true,
// //     origin: process.env.GROOMZY_FRONTEND_URL,
// //   },
// // });
