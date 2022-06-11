import { GraphQLYogaError } from "@graphql-yoga/node";

import { tokenAuthUser } from "utils";
import { IContext } from "resolvers/types";
import { IDeleteStaffArgs } from "./types";

export const deleteStaffMutation = async (
  _: any,
  deleteStaffInput: IDeleteStaffArgs,
  ctx: IContext
) => {
  tokenAuthUser(ctx);
  const { staffId } = deleteStaffInput;

  try {
    // Staff id is required
    if (!staffId) {
      throw new GraphQLYogaError("Staff id is required.");
    }

    const staff = await ctx.prisma.staff.delete({
      where: {
        id: staffId,
      },
    });

    return {
      message: {
        message: "Staff deleted successfully",
      },
      staff,
    };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
