import { GraphQLError } from "graphql";
import { IContext } from "../../types";
import { IGallery } from "./types";

export const gallery = async (_: any, args: IGallery, ctx: IContext) => {
  try {
    const { galleryId } = args;

    if (!galleryId) {
      throw new GraphQLError("Gallery id is required.");
    }

    return ctx.prisma.gallery.findUnique({
      where: {
        id: galleryId,
      },
    });
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
