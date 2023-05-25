import { Comment, UserRole } from "@prisma/client";
import { GraphQLError } from "graphql";
import { userAuthToken } from "../../../utils/userAuthToken";
import { IContext } from "../../types";
import { PaginationType } from "../types";
import { IComments } from "./types";

export const comments = async (_: any, args: IComments, ctx: IContext) => {
  try {
    const tokenDetails = userAuthToken(ctx);
    const { providerId, limit = 1, cursor, paginationType, page = 0 } = args;
    let comments: Comment[];
    let commentsCount: number;
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
        comments = await ctx.prisma.comment.findMany({
          ...pagination,
          orderBy: {
            id: "asc",
          },
          include: {
            parent: true,
            children: true,
            client: true,
            clientLikes: true,
            providerLikes: true,
          },
        });

        commentsCount = await ctx.prisma.comment.count();
      } else {
        comments = await ctx.prisma.comment.findMany({
          ...pagination,
          where: {
            providerId,
          },
          orderBy: {
            id: "asc",
          },
          include: {
            parent: true,
            children: true,
            client: true,
            clientLikes: true,
            providerLikes: true,
          },
        });

        commentsCount = await ctx.prisma.comment.count({
          where: {
            providerId,
          },
        });
      }
    } else {
      const { id: userId } = tokenDetails!;

      comments = await ctx.prisma.comment.findMany({
        ...pagination,
        where: {
          provider: {
            userId,
          },
        },
        orderBy: {
          id: "asc",
        },
        include: {
          parent: true,
          children: true,
          client: true,
          clientLikes: true,
          providerLikes: true,
        },
      });

      commentsCount = await ctx.prisma.comment.count({
        where: {
          provider: {
            userId,
          },
        },
      });
    }

    let newCursor: number | undefined;
    if (comments.length === limit) {
      newCursor = comments[limit - 1].id;
    } else {
      newCursor = undefined;
    }

    return {
      comments,
      cursor: newCursor,
      count: commentsCount,
    };
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
