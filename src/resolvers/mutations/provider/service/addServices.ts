import { GraphQLYogaError } from "@graphql-yoga/node";
import jwt from "jsonwebtoken";

import { IContext } from "resolvers/types";
import { IAddServiceArgs } from "./types";

export const addServiceMutation = async (
  _: any,
  addServiceInput: IAddServiceArgs,
  ctx: IContext
) => {
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

    // Check if an auth header is set.
    const authorizationHeader =
      ctx.request.headers.get("x-access-token") ||
      ctx.request.headers.get("authorization");

    // TODO: Should we throw an Error instead?

    if (!authorizationHeader) {
      throw new GraphQLYogaError(
        "Looks like you are not signed in. Please sign in."
      );
    }

    // Check if the JWT secret key is defined.
    if (!process.env.GROOMZY_JWT_SECRET) {
      throw new GraphQLYogaError("Internal server error.");
    }

    // Get the token.
    const token = authorizationHeader.split(" ")[1];
    // Verify the token if it is valid.
    const signedIn = jwt.verify(token, process.env.GROOMZY_JWT_SECRET);

    const { id: providerId, role } = signedIn as { id: number; role: string };

    const serviceCategory = await ctx.prisma.category.findFirst({
      where: {
        category: category,
      },
    });

    await ctx.prisma.service.create({
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
    });

    return {
      message: "Service added successfully",
    };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
