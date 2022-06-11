import { GraphQLYogaError } from "@graphql-yoga/node";

import { tokenAuthUser } from "utils";
import { IContext } from "resolvers/types";
import { IDeleteSocialArgs } from "./types";

export const deleteSocialMutation = async (
  _: any,
  deleteSocialInput: IDeleteSocialArgs,
  ctx: IContext
) => {
  tokenAuthUser(ctx);
  const { socialId } = deleteSocialInput;

  try {
    // Social id is required
    if (!socialId) {
      throw new GraphQLYogaError("Social id is required.");
    }

    const social = await ctx.prisma.providerSocial.delete({
      where: {
        id: socialId,
      },
    });

    return {
      message: {
        message: "Social deleted successfully",
      },
      social,
    };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
