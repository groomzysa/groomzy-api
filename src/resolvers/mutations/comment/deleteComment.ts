import { GraphQLError } from "graphql";
import { userAuthToken } from "../../../utils/userAuthToken";
import { IContext } from "../../types";
import { IDeleteComment } from "./types";
import { Comment, UserRole } from "@prisma/client";

export const deleteComment = async (
  _: any,
  args: IDeleteComment,
  ctx: IContext
) => {
  const tokenDetails = userAuthToken(ctx);

  if (!tokenDetails) {
    throw new GraphQLError("Unauthorised!");
  }

  try {
    const { id: userId, role } = tokenDetails;
    const { commentId } = args;
    let deletedComment: Comment;

    if (role === UserRole.CLIENT) {
      const client = await ctx.prisma.client.findUnique({ where: { userId } });

      if (!client) {
        throw new GraphQLError("Something went wrong. Please try to login");
      }

      deletedComment = await ctx.prisma.comment.delete({
        where: {
          id_clientId: {
            id: commentId,
            clientId: client.id,
          },
        },
      });
    } else {
      const provider = await ctx.prisma.provider.findUnique({
        where: { userId },
      });

      if (!provider) {
        throw new GraphQLError("Something went wrong. Please try to login");
      }

      deletedComment = await ctx.prisma.comment.delete({
        where: {
          id_providerId: {
            id: commentId,
            providerId: provider.id,
          },
        },
      });
    }

    return deletedComment;
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
