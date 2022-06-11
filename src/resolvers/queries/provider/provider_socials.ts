import { GraphQLYogaError } from "@graphql-yoga/node";
import { IContext } from "resolvers/types";

import { IProviderSocialsArgs } from "./types";

export const providerSocialsQuery = async (
  _: any,
  providerSocialsArgs: IProviderSocialsArgs,
  ctx: IContext
) => {
  const { providerId } = providerSocialsArgs;
  try {
    return ctx.prisma.providerSocial.findMany({
      where: {
        providerId,
      },
    });
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
