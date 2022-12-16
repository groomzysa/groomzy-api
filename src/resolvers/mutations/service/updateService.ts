import { GraphQLError } from "graphql";
import { userAuthToken } from "../../../utils/userAuthToken";
import { IContext } from "../../types";
import { IUpdateService } from "./types";

export const updateService = async (
  _: any,
  args: IUpdateService,
  ctx: IContext
) => {
  const tokenDetails = userAuthToken(ctx);

  if (!tokenDetails) {
    throw new GraphQLError("Unauthorised!");
  }

  try {
    const {
      serviceId,
      name,
      description,
      price,
      duration,
      durationUnit,
      category,
      inHouse,
    } = args;
    const updateData: Omit<IUpdateService, "serviceId"> = {};

    // update name
    if (name) {
      updateData.name = name;
    }

    // update description
    if (description) {
      updateData.description = description;
    }

    // update price
    if (price) {
      updateData.price = price;
    }

    // update duration
    if (duration) {
      updateData.duration = duration;
    }

    // update duration unit
    if (durationUnit) {
      updateData.durationUnit = durationUnit;
    }

    // update category
    if (category) {
      updateData.category = category;
    }

    // update in-house
    if (inHouse != undefined) {
      updateData.inHouse = inHouse;
    }

    return await ctx.prisma.service.update({
      where: {
        id: serviceId,
      },
      data: {
        ...updateData,
      },
    });
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
