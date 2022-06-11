import { GraphQLYogaError } from "@graphql-yoga/node";
import { IContext } from "resolvers/types";

import { IProviderGalleryArgs } from "./types";

export const providerGalleryQuery = async (
  _: any,
  providerGallerysArgs: IProviderGalleryArgs,
  ctx: IContext
) => {
  const { providerId } = providerGallerysArgs;
  try {
    return (
      (await ctx.prisma.providerGallery.findMany({
        where: {
          providerId,
        },
      })) || []
    );
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
