import { GraphQLYogaError } from "@graphql-yoga/node";

import { tokenAuthUser } from "utils";
import { IContext } from "resolvers/types";
import { IEditOperatingTimeArgs } from "./types";

export const editOperatingTimeMutation = async (
  _: any,
  editOperatingTimeInput: IEditOperatingTimeArgs,
  ctx: IContext
) => {
  tokenAuthUser(ctx);
  const { dayTimeId, startTime, endTime } = editOperatingTimeInput;

  const dayTimeToUpdate: Omit<IEditOperatingTimeArgs, "dayTimeId" | "day"> = {};

  try {
    // Start time to update
    if (startTime) {
      dayTimeToUpdate.startTime = startTime;
    }

    // End time to update
    if (endTime) {
      dayTimeToUpdate.endTime = endTime;
    }

    const operatingTime = await ctx.prisma.dayTime.update({
      where: {
        id: dayTimeId,
      },
      data: {
        time: {
          update: dayTimeToUpdate,
        },
      },
      include: {
        day: true,
        time: true,
      },
    });

    return {
      message: {
        message: "Day time updated successfully",
      },
      operatingTime,
    };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
