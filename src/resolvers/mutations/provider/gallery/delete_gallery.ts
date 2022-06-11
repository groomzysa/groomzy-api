import { GraphQLYogaError } from "@graphql-yoga/node";

import { googleGalleryStorageBucket, tokenAuthUser } from "utils";
import { IContext } from "resolvers/types";
import { IDeleteGalleryArgs } from "./types";

export const deleteGalleryMutation = async (
  _: any,
  deleteGalleryInput: IDeleteGalleryArgs,
  ctx: IContext
) => {
  const { bucket } = googleGalleryStorageBucket();

  const { id } = tokenAuthUser(ctx);
  const { galleryId, fileName } = deleteGalleryInput;

  try {
    // Gallery id is required
    if (!galleryId) {
      throw new GraphQLYogaError("Gallery id is required.");
    }

    const deleted = await bucket.file(fileName).delete();
    const gallery = await ctx.prisma.providerGallery.delete({
      where: {
        id: galleryId,
      },
    });

    return {
      message: {
        message: "Gallery deleted successfully",
      },
      gallery,
    };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
