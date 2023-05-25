import { GraphQLError } from "graphql";
import { userAuthToken } from "../../../utils/userAuthToken";
import { IContext } from "../../types";
import { IUpdateComment } from "./types";

export const updateComment = async (
  _: any,
  args: IUpdateComment,
  ctx: IContext
) => {
  const tokenDetails = userAuthToken(ctx);

  if (!tokenDetails) {
    throw new GraphQLError("Unauthorised!");
  }

  try {
    const { commentId, message } = args;
    const updateData: Omit<IUpdateComment, "commentId"> = {};

    // update message
    if (message) {
      updateData.message = message;
    }

    return await ctx.prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        ...updateData,
      },
    });
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
