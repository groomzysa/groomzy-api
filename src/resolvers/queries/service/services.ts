import { Service, UserRole } from "@prisma/client";
import { GraphQLError } from "graphql";
import { userAuthToken } from "../../../utils/userAuthToken";
import { IContext } from "../../types";
import { PaginationType } from "../types";
import { IServices } from "./types";

export const services = async (_: any, args: IServices, ctx: IContext) => {
  try {
    const tokenDetails = userAuthToken(ctx);
    const { providerId, limit = 1, cursor, paginationType, page = 0 } = args;
    let services: Service[];
    let servicesCount: number;
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
        services = await ctx.prisma.service.findMany({
          ...pagination,
          orderBy: {
            id: "asc",
          },
        });

        servicesCount = await ctx.prisma.service.count();
      } else {
        services = await ctx.prisma.service.findMany({
          ...pagination,
          where: {
            providerId,
          },
          orderBy: {
            id: "asc",
          },
        });

        servicesCount = await ctx.prisma.service.count({
          where: {
            providerId,
          },
        });
      }
    } else {
      const { id: userId } = tokenDetails!;

      services = await ctx.prisma.service.findMany({
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

      servicesCount = await ctx.prisma.service.count({
        where: {
          provider: {
            userId,
          },
        },
      });
    }

    let newCursor: number | undefined;
    if (services.length === limit) {
      newCursor = services[limit - 1].id;
    } else {
      newCursor = undefined;
    }

    return {
      services,
      cursor: newCursor,
      count: servicesCount,
    };
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
