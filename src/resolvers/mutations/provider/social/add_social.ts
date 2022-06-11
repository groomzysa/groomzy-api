import { GraphQLYogaError } from "@graphql-yoga/node";

import { tokenAuthUser } from "utils";
import { IContext } from "resolvers/types";
import { IAddSocialArgs } from "./types";

export const addSocialMutation = async (
  _: any,
  addSocialInput: IAddSocialArgs,
  ctx: IContext
) => {
  const { id } = tokenAuthUser(ctx);
  const { name, url } = addSocialInput;

  try {
    // Social name is required
    if (!name) {
      throw new GraphQLYogaError("Social name is required.");
    }

    // Social url is required
    if (!url) {
      throw new GraphQLYogaError("Social url is required.");
    }

    const social = await ctx.prisma.providerSocial.create({
      data: {
        name,
        url,
        providerId: id,
      },
    });

    return {
      message: {
        message: "Social added successfully",
      },
      social,
    };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
