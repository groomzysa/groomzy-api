import { GraphQLYogaError } from "@graphql-yoga/node";
import { IContext } from "resolvers/types";
import { IGalleryArgs } from "./types";

export const galleryQuery = async (
  _: any,
  galleryArgs: IGalleryArgs,
  ctx: IContext
) => {
  const { id } = galleryArgs;

  try {
    return ctx.prisma.providerGallery.findFirst({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
