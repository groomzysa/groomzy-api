import { IContext } from "../../types";
import { IAddComment } from "./types";
import { GraphQLError } from "graphql";
import { userAuthToken } from "../../../utils/userAuthToken";
import { Comment, UserRole } from "@prisma/client";

export const addComment = async (_: any, args: IAddComment, ctx: IContext) => {
  try {
    const { clientId, parentId, providerId, message } = args;
    const tokenDetails = userAuthToken(ctx);

    if (!tokenDetails) return;

    const { id: userId, role } = tokenDetails;

    // is provider id empty
    if (role === UserRole.CLIENT && !providerId) {
      throw new GraphQLError("Provider id is required.");
    }

    // is provider id empty
    if (role === UserRole.PROVIDER && !clientId) {
      throw new GraphQLError("Client id is required.");
    }

    // is message empty
    if (!message) {
      throw new GraphQLError("Message is required.");
    }

    let comment: Comment;

    if (parentId) {
      if (providerId) {
        comment = await ctx.prisma.comment.create({
          data: {
            message,
            parent: {
              connect: {
                id: parentId,
              },
            },
            provider: {
              connect: {
                id: providerId,
              },
            },
            client: {
              connect: {
                userId,
              },
            },
          },
        });
      } else {
        comment = await ctx.prisma.comment.create({
          data: {
            message,
            parent: {
              connect: {
                id: parentId,
              },
            },
            provider: {
              connect: {
                userId,
              },
            },
            client: {
              connect: {
                id: clientId,
              },
            },
          },
        });
      }
    } else {
      if (providerId) {
        console.log(providerId, userId, message);
        comment = await ctx.prisma.comment.create({
          data: {
            message,
            provider: {
              connect: {
                id: providerId,
              },
            },
            client: {
              connect: {
                userId,
              },
            },
          },
        });
      } else {
        comment = await ctx.prisma.comment.create({
          data: {
            message,
            provider: {
              connect: {
                userId,
              },
            },
            client: {
              connect: {
                id: clientId,
              },
            },
          },
        });
      }
    }
    return comment;
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
