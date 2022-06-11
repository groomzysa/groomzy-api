import { tokenAuthUser } from "utils";
import { GraphQLYogaError } from "@graphql-yoga/node";
import { IContext } from "resolvers/types";

export const providerQuery = async (_: any, __: any, ctx: IContext) => {
  try {
    const { id } = tokenAuthUser(ctx);

    return ctx.prisma.provider.findUnique({
      where: { id },
      include: { address: true },
    });
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
