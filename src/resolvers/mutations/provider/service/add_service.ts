import { GraphQLYogaError } from "@graphql-yoga/node";

import { tokenAuthUser } from "utils";
import { IContext } from "resolvers/types";
import { IAddServiceArgs } from "./types";

export const addServiceMutation = async (
  _: any,
  addServiceInput: IAddServiceArgs,
  ctx: IContext
) => {
  const { id: providerId } = tokenAuthUser(ctx);
  const {
    title,
    category,
    price,
    description,
    duration,
    durationUnit,
    inHouse,
  } = addServiceInput;

  try {
    // Title is required
    if (!title) {
      throw new GraphQLYogaError("Title is required.");
    }

    // Category is required
    if (!category) {
      throw new GraphQLYogaError("Category is required.");
    }

    // Price is required
    if (!price) {
      throw new GraphQLYogaError("Price is required.");
    }

    // Description is required
    if (!description) {
      throw new GraphQLYogaError("Description is required.");
    }

    // Duration is required
    if (!duration) {
      throw new GraphQLYogaError("Duration is required.");
    }

    // Duration unit is required
    if (!durationUnit) {
      throw new GraphQLYogaError("Duration unit is required.");
    }

    const serviceCategory = await ctx.prisma.category.findFirst({
      where: {
        category: category,
      },
    });

    const service = await ctx.prisma.service.create({
      data: {
        title,
        description,
        duration,
        durationUnit,
        price,
        inHouse,
        serviceProviderCategories: {
          create: {
            category: {
              connect: {
                id: serviceCategory.id,
              },
            },
            provider: {
              connect: {
                id: providerId,
              },
            },
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

    return {
      message: {
        message: "Service added successfully",
      },
      service,
    };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
