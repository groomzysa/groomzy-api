import { GraphQLYogaError } from "@graphql-yoga/node";
import { IContext } from "resolvers/types";

export const clientsQuery = async (_: any, __: any, ctx: IContext) => {
  try {
    return ctx.prisma.client.findMany({
      include: {
        address: true,
      },
    });
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
