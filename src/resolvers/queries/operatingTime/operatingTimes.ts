import { OperatingTime, UserRole } from "@prisma/client";
import { GraphQLError } from "graphql";
import { userAuthToken } from "../../../utils/userAuthToken";
import { IContext } from "../../types";
import { PaginationType } from "../types";
import { IOperatingTimes } from "./types";

export const operatingTimes = async (
  _: any,
  args: IOperatingTimes,
  ctx: IContext
) => {
  try {
    const tokenDetails = userAuthToken(ctx);

    if (!tokenDetails || tokenDetails.role !== UserRole.PROVIDER) {
      return ctx.prisma.operatingTime.findMany();
    }

    const { id: userId } = tokenDetails;
    const { limit = 1, cursor, paginationType, page = 0 } = args;
    let pagination = {};

    if (paginationType === PaginationType.CURSOR) {
      pagination = {
        take: limit,
        cursor: cursor ? { id: cursor } : undefined,
        skip: cursor ? 1 : 0,
      };
    } else {
      pagination = {
        skip: page * limit,
        take: limit,
      };
    }

    const operatingTimes = await ctx.prisma.operatingTime.findMany({
      ...pagination,
      where: {
        provider: {
          userId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const operatingTimeDays = await ctx.prisma.operatingTime.findMany({
      where: {
        provider: {
          userId,
        },
      },
      select: {
        day: true,
      },
    });

    const operatingTimesCount = await ctx.prisma.operatingTime.count({
      where: {
        provider: {
          userId,
        },
      },
    });

    let newCursor: number | undefined;
    if (operatingTimes.length === limit) {
      newCursor = operatingTimes[limit - 1].id;
    } else {
      newCursor = undefined;
    }

    return {
      operatingTimes,
      days: operatingTimeDays.map((operatingTimeDay) => operatingTimeDay.day),
      cursor: newCursor,
      count: operatingTimesCount,
    };
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
