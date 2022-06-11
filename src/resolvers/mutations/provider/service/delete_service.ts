import { GraphQLYogaError } from "@graphql-yoga/node";

import { tokenAuthUser } from "utils";
import { IContext } from "resolvers/types";
import { IDeleteServiceArgs } from "./types";

export const deleteServiceMutation = async (
  _: any,
  deleteServiceInput: IDeleteServiceArgs,
  ctx: IContext
) => {
  const { id: providerId } = tokenAuthUser(ctx);
  const { serviceId, categoryId } = deleteServiceInput;

  try {
    // Service id is required
    if (!serviceId) {
      throw new GraphQLYogaError("Service id is required.");
    }

    // Service category is required
    if (!categoryId) {
      throw new GraphQLYogaError("Service category id is required.");
    }

    await ctx.prisma.serviceProviderCategory.delete({
      where: {
        categoryId_serviceId_providerId: {
          categoryId,
          serviceId,
          providerId,
        },
      },
    });

    const service = await ctx.prisma.service.delete({
      where: {
        id: serviceId,
      },
      include: {
        serviceProviderCategories: true,
      },
    });

    return {
      message: {
        message: "Service deleted successfully",
      },
      service,
    };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
