import { GraphQLYogaError } from "@graphql-yoga/node";

import { tokenAuthUser } from "utils";
import { IContext } from "resolvers/types";
import { IEditSocialArgs } from "./types";

export const editSocialMutation = async (
  _: any,
  editSocialInput: IEditSocialArgs,
  ctx: IContext
) => {
  tokenAuthUser(ctx);
  const { name, url, socialId } = editSocialInput;

  const socialToUpdate: Omit<IEditSocialArgs, "socialId"> = {};

  try {
    // Update social name
    if (name) {
      socialToUpdate.name = name;
    }

    // Update social url
    if (url) {
      socialToUpdate.url = url;
    }

    const social = await ctx.prisma.providerSocial.update({
      where: {
        id: socialId,
      },
      data: socialToUpdate,
    });

    return {
      message: {
        message: "Social updated successfully",
      },
      social,
    };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
