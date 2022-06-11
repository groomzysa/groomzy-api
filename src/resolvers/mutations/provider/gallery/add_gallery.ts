import { GraphQLYogaError } from "@graphql-yoga/node";
import fs from "fs";
import path from "path";

import { googleGalleryStorageBucket, tokenAuthUser } from "utils";
import { IContext } from "resolvers/types";
import { IAddGalleryArgs } from "./types";

export const addGalleryMutation = async (
  _: any,
  addGalleryInput: IAddGalleryArgs,
  ctx: IContext
) => {
  const { bucket } = googleGalleryStorageBucket();

  const { id } = tokenAuthUser(ctx);
  const { name, galleryImageFile } = addGalleryInput;
  let galleryImageFileUrl: string;

  try {
    // Gallery name is required
    if (!name) {
      throw new GraphQLYogaError("Gallery name is required.");
    }

    // Gallery image is required
    if (!galleryImageFile) {
      throw new GraphQLYogaError("Gallery image is required.");
    }

    const fileStream = await galleryImageFile.stream();
    await fs.promises.writeFile(
      path.join(__dirname, galleryImageFile.name),
      fileStream
    );

    const uploadedImage = await bucket.upload(
      path.join(__dirname, galleryImageFile.name),
      {
        metadata: {
          cacheControl: "max-age=0",
        },
      }
    );

    galleryImageFileUrl = uploadedImage[0].publicUrl();

    fs.rmSync(path.join(__dirname, galleryImageFile.name));

    delete addGalleryInput.galleryImageFile;

    addGalleryInput.url = galleryImageFileUrl;

    const gallery = await ctx.prisma.providerGallery.create({
      data: {
        ...addGalleryInput,
        fileName: galleryImageFile.name,
        providerId: id,
      },
    });

    return {
      message: {
        message: "Gallery image added successfully",
      },
      gallery,
    };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
