import { GraphQLYogaError } from "@graphql-yoga/node";

import { tokenAuthUser } from "utils";
import { IContext } from "resolvers/types";
import { IAddStaffArgs } from "./types";

export const addStaffMutation = async (
  _: any,
  addStaffInput: IAddStaffArgs,
  ctx: IContext
) => {
  const { id } = tokenAuthUser(ctx);
  const { fullName } = addStaffInput;

  try {
    // Full name is required
    if (!fullName) {
      throw new GraphQLYogaError("Full name is required.");
    }

    const staff = await ctx.prisma.staff.create({
      data: {
        fullName,
        provider: {
          connect: {
            id,
          },
        },
      },
    });

    return {
      message: {
        message: "Staff added successfully",
      },
      staff,
    };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
