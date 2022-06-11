import { GraphQLYogaError } from "@graphql-yoga/node";
import { BusinessDay } from "@prisma/client";

import { tokenAuthUser } from "utils";
import { IContext } from "resolvers/types";
import { IAddOperatingTimeArgs } from "./types";

export const addOperatingTimeMutation = async (
  _: any,
  addOperatingTimeInput: IAddOperatingTimeArgs,
  ctx: IContext
) => {
  const { id: providerId } = tokenAuthUser(ctx);
  const { day, startTime, endTime } = addOperatingTimeInput;

  try {
    // Day is required
    if (!day) {
      throw new GraphQLYogaError("Day is required.");
    }

    // Start time is required
    if (!startTime) {
      throw new GraphQLYogaError("Start time is required.");
    }

    // End time is required
    if (!endTime) {
      throw new GraphQLYogaError("End time is required.");
    }

    try {
      const _day = await ctx.prisma.day.findUnique({
        where: {
          day: day as BusinessDay,
        },
      });

      const businessTimeExist = await ctx.prisma.dayTime.findUnique({
        where: {
          dayId_providerId: {
            dayId: _day.id,
            providerId,
          },
        },
      });

      if (businessTimeExist) {
        throw new GraphQLYogaError(`Business day ${day} already exist`);
      }

      const operatingTime = await ctx.prisma.dayTime.create({
        data: {
          day: {
            connect: {
              day: day as BusinessDay,
            },
          },
          time: {
            create: {
              startTime,
              endTime,
            },
          },
          provider: {
            connect: {
              id: providerId,
            },
          },
        },
        include: {
          day: true,
          time: true,
        },
      });

      return {
        message: {
          message: "Day time added successfully",
        },
        operatingTime,
      };
    } catch (error) {
      throw new GraphQLYogaError(error.message);
    }
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
