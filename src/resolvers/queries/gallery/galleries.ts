import { Gallery, UserRole } from "@prisma/client";
import { GraphQLError } from "graphql";
import { userAuthToken } from "../../../utils/userAuthToken";
import { IContext } from "../../types";
import { PaginationType } from "../types";
import { IGalleries } from "./types";

export const galleries = async (_: any, args: IGalleries, ctx: IContext) => {
  try {
    const tokenDetails = userAuthToken(ctx);
    const { providerId, limit = 1, cursor, paginationType, page = 0 } = args;
    let galleries: Gallery[];
    let galleriesCount: number;
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
        galleries = await ctx.prisma.gallery.findMany({
          ...pagination,
          orderBy: {
            id: "asc",
          },
        });

        galleriesCount = await ctx.prisma.gallery.count();
      } else {
        galleries = await ctx.prisma.gallery.findMany({
          ...pagination,
          where: {
            providerId,
          },
          orderBy: {
            id: "asc",
          },
        });

        galleriesCount = await ctx.prisma.gallery.count({
          where: {
            providerId,
          },
        });
      }
    } else {
      const { id: userId } = tokenDetails!;

      galleries = await ctx.prisma.gallery.findMany({
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

      galleriesCount = await ctx.prisma.gallery.count({
        where: {
          provider: {
            userId,
          },
        },
      });
    }

    let newCursor: number | undefined;
    if (galleries.length === limit) {
      newCursor = galleries[limit - 1].id;
    } else {
      newCursor = undefined;
    }

    return {
      galleries,
      cursor: newCursor,
      count: galleriesCount,
    };
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
