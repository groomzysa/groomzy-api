import { GraphQLError } from "graphql";
import { userAuthToken } from "../../../utils/userAuthToken";
import { IContext } from "../../types";
import { IDeleteGallery } from "./types";

export const deleteGallery = async (
  _: any,
  args: IDeleteGallery,
  ctx: IContext
) => {
  const tokenDetails = userAuthToken(ctx);

  if (!tokenDetails) {
    throw new GraphQLError("Unauthorised!");
  }

  try {
    const { galleryId } = args;

    return await ctx.prisma.gallery.delete({
      where: {
        id: galleryId,
      },
    });
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
