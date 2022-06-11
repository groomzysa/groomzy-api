import { GraphQLYogaError } from "@graphql-yoga/node";

import { tokenAuthUser } from "utils";
import { IContext } from "resolvers/types";
import { IEditStaffArgs } from "./types";

export const editStaffMutation = async (
  _: any,
  editStaffInput: IEditStaffArgs,
  ctx: IContext
) => {
  tokenAuthUser(ctx);
  const { fullName, staffId } = editStaffInput;

  const staffToUpdate: Omit<IEditStaffArgs, "staffId"> = {};

  try {
    // Update full name
    if (fullName) {
      staffToUpdate.fullName = fullName;
    }

    const staff = await ctx.prisma.staff.update({
      where: {
        id: staffId,
      },
      data: staffToUpdate,
    });

    return {
      message: {
        message: "Staff updated successfully",
      },
      staff,
    };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
