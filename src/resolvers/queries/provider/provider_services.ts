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
    // return ctx.prisma.provider.findFirst({
    //   where: {
    //     id: providerId,
    //   },
    //   select: {
    //     serviceProviderCategories: {
    //       select: {
    //         service: true,
    //         category: true,
    //       },
    //     },
    //   },
    // });
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
