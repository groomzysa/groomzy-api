import { PrismaClient } from "@prisma/client";
import express from "express";
import bodyParser from "body-parser";

import { createYoga } from "graphql-yoga";
import { schema } from "./schema";
import path from "path";
import fs from "fs";

// Instatiate prisma client
const prisma = new PrismaClient();

// Instantiate Yoga with a GraphQL schema.
const yoga = createYoga({
  context: ({ request }) => {
    return {
      prisma,
      request,
    };
  },
  schema,
  graphqlEndpoint: "/",
});

export const AppServer = () => {
  // Express server
  const app = express();

  app.use(bodyParser.json());

  //Enabling CORS
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.get("/?/common-media-file/:mediaFilename", (req, res) => {
    // Not getting the data request
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
    const basePath = `${process.env.GROOMZY_IMAGES_BASE_PATH || ""}/common/`;

    // Get all the params from the request
    const { mediaFilename } = req.params;

    // Form a full path for the image location
    const fullPath = path.join(basePath, `${mediaFilename}.png`);

    // Check if file exist
    if (!fs.existsSync(fullPath)) {
      res.status(404).send(notFound);

      return;
    }

    // Download the media logo image.
    res.download(fullPath, (err) => {
      if (err) {
        if (!res.headersSent) {
          res.status(500).send(internalServerError);
        } else {
          res.end();
        }
      }
    });
  });

  app.get("/?/profiles/:mediaFilename", (req, res) => {
    // Not getting the data request
    const notFound = {
      message: "Profile image not found.",
      success: false,
    };

    // Internal server error
    const internalServerError = {
      message: "There has been an internal server error while retrieving logo.",
      success: false,
    };

    // Get the base path if exist
    const basePath = `${process.env.GROOMZY_IMAGES_BASE_PATH || ""}/profiles/`;

    // Get all the params from the request
    const { mediaFilename } = req.params;

    // Form a full path for the image location
    const fullPath = path.join(basePath, `${mediaFilename}`);

    // Check if file exist
    if (!fs.existsSync(fullPath)) {
      res.status(404).send(notFound);

      return;
    }

    // Download the media logo image.
    res.download(fullPath, (err) => {
      if (err) {
        if (!res.headersSent) {
          res.status(500).send(internalServerError);
        } else {
          res.end();
        }
      }
    });
  });

  app.get("/?/tsandcs/:mediaFilename", (req, res) => {
    // Not getting the data request
    const notFound = {
      message: "Ts and Cs not found.",
      success: false,
    };

    // Internal server error
    const internalServerError = {
      message: "There has been an internal server error while retrieving logo.",
      success: false,
    };

    // Get the base path if exist
    const basePath = `${process.env.GROOMZY_TS_AND_CS_BASE_PATH || ""}`;

    // Get all the params from the request
    const { mediaFilename } = req.params;

    console.log(mediaFilename);

    // Form a full path for the file location
    const fullPath = path.join(basePath, `${mediaFilename}`);

    // Check if file exist
    if (!fs.existsSync(fullPath)) {
      res.status(404).send(notFound);

      return;
    }

    // Download the ts and cs file.
    res.download(fullPath, (err) => {
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
