import { GraphQLYogaError } from "@graphql-yoga/node";

import { tokenAuthUser } from "utils";
import { IContext } from "resolvers/types";
import { IDeleteOperatingTimeArgs } from "./types";

export const deleteOperatingTimeMutation = async (
  _: any,
  deleteOperatingTimeInput: IDeleteOperatingTimeArgs,
  ctx: IContext
) => {
  tokenAuthUser(ctx);
  const { dayTimeId } = deleteOperatingTimeInput;

  try {
    const operatingTime = await ctx.prisma.dayTime.delete({
      where: {
        id: dayTimeId,
      },
      include: {
        day: true,
        time: true,
      },
    });

    return {
      message: {
        message: "Day time deleted successfully",
      },
      operatingTime,
    };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
