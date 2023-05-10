import { Staff, UserRole } from "@prisma/client";
import { GraphQLError } from "graphql";
import { userAuthToken } from "../../../utils/userAuthToken";
import { IContext } from "../../types";
import { PaginationType } from "../types";
import { IStaffs } from "./types";

export const staffs = async (_: any, args: IStaffs, ctx: IContext) => {
  try {
    const tokenDetails = userAuthToken(ctx);
    const { providerId, limit = 1, cursor, paginationType, page = 0 } = args;
    let staffs: Staff[];
    let staffsCount: number;
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

    if (!tokenDetails || tokenDetails.role !== UserRole.PROVIDER) {
      if (!providerId) {
        staffs = await ctx.prisma.staff.findMany({
          ...pagination,
          orderBy: {
            id: "asc",
          },
        });

        staffsCount = await ctx.prisma.staff.count();
      } else {
        staffs = await ctx.prisma.staff.findMany({
          ...pagination,
          where: {
            providerId,
          },
          orderBy: {
            id: "asc",
          },
        });

        staffsCount = await ctx.prisma.staff.count({
          where: {
            providerId,
          },
        });
      }
    } else {
      const { id: userId } = tokenDetails!;

      staffs = await ctx.prisma.staff.findMany({
        ...pagination,
        where: {
          provider: {
            userId,
          },
        },
        orderBy: {
          id: "asc",
        },
      });

      staffsCount = await ctx.prisma.staff.count({
        where: {
          provider: {
            userId,
          },
        },
      });
    }

    let newCursor: number | undefined;
    if (staffs.length === limit) {
      newCursor = staffs[limit - 1].id;
    } else {
      newCursor = undefined;
    }

    return {
      staffs,
      cursor: newCursor,
      count: staffsCount,
    };
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
