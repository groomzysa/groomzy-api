import { IContext } from "../../types";
import { IAddService } from "./types";
import { GraphQLError } from "graphql";
import { userAuthToken } from "../../../utils/userAuthToken";
import { CategoryType } from "@prisma/client";

export const addService = async (_: any, args: IAddService, ctx: IContext) => {
  try {
    const {
      name,
      description,
      price,
      duration,
      durationUnit,
      inHouse,
      category,
    } = args;
    const tokenDetails = userAuthToken(ctx);

    if (!tokenDetails) return;

    const { id: userId } = tokenDetails;

    // is name empty
    if (!name) {
      throw new GraphQLError("Service name is required.");
    }

    // is description empty
    if (!description) {
      throw new GraphQLError("Description is required.");
    }

    // is price empty
    if (!price) {
      throw new GraphQLError("Price is required");
    }

    // is duration empty
    if (!duration) {
      throw new GraphQLError("Duration is required");
    }

    // is duration unit empty
    if (!durationUnit) {
      throw new GraphQLError("Duration unit is required");
    }

    // is category id empty
    if (!category) {
      throw new GraphQLError("Category is required");
    }

    return ctx.prisma.service.create({
      data: {
        name,
        description,
        price,
        duration,
        durationUnit,
        inHouse,
        category,
        provider: {
          connect: {
            userId,
          },
        },
      },
    });
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
