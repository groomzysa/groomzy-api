import { GraphQLYogaError } from "@graphql-yoga/node";
import { IContext } from "resolvers/types";

export const providerServicesQuery = async (
  _: any,
  providerServicesArgs: { providerId: number },
  ctx: IContext
) => {
  const { providerId } = providerServicesArgs;

  try {
    return ctx.prisma.service.findMany({
      where: {
        serviceProviderCategories: {
          every: {
            providerId,
          },
        },
      },
      include: {
        serviceProviderCategories: {
          select: {
            category: true,
          },
        },
      },
    });
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
