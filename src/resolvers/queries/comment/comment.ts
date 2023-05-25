import { GraphQLError } from "graphql";
import { IContext } from "../../types";
import { IComment } from "./types";

export const comment = async (_: any, args: IComment, ctx: IContext) => {
  try {
    const { commentId } = args;

    if (!commentId) {
      throw new GraphQLError("Comment id is required.");
    }

    return ctx.prisma.comment.findUnique({
      where: {
        id: commentId,
      },
      include: {
        parent: true,
        children: true,
        client: true,
        clientLikes: true,
        providerLikes: true,
      },
    });
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
