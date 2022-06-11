import { GraphQLYogaError } from "@graphql-yoga/node";
import { IContext } from "resolvers/types";
import { ISocialArgs } from "./types";

export const socialQuery = async (
  _: any,
  socialArgs: ISocialArgs,
  ctx: IContext
) => {
  const { id } = socialArgs;

  try {
    return ctx.prisma.providerSocial.findFirst({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
