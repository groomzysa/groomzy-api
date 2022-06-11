import { GraphQLYogaError } from "@graphql-yoga/node";
import { IContext } from "resolvers/types";
import { IServiceArgs } from "./types";

export const serviceQuery = async (
  _: any,
  servicesArgs: IServiceArgs,
  ctx: IContext
) => {
  const { id } = servicesArgs;

  try {
    return ctx.prisma.service.findFirst({
      where: {
        id,
      },
      include: {
        serviceProviderCategories: {
          include: {
            category: true,
          },
        },
      },
    });
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
