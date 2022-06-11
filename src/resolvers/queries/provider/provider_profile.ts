import { GraphQLYogaError } from "@graphql-yoga/node";
import { IContext } from "resolvers/types";
import { IProviderProfileArgs } from "./types";

export const providerProfileQuery = async (
  _: any,
  providerProfileArgs: IProviderProfileArgs,
  ctx: IContext
) => {
  const { providerId } = providerProfileArgs;

  try {
    return ctx.prisma.providerProfile.findFirst({
      where: {
        providerId,
      },
    });
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
