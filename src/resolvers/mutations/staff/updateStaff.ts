import { GraphQLError } from "graphql";
import { userAuthToken } from "../../../utils/userAuthToken";
import { IContext } from "../../types";
import { IUpdateStaff } from "./types";

export const updateStaff = async (
  _: any,
  args: IUpdateStaff,
  ctx: IContext
) => {
  const tokenDetails = userAuthToken(ctx);

  if (!tokenDetails) {
    throw new GraphQLError("Unauthorised!");
  }

  try {
    const {
      staffId,
      firstName,
      lastName,
    } = args;
    const updateData: Omit<IUpdateStaff, "staffId"> = {};

    // update first name
    if (firstName) {
      updateData.firstName = firstName;
    }

    // update last name
    if (lastName) {
      updateData.lastName = lastName;
    }

    return await ctx.prisma.staff.update({
      where: {
        id: staffId,
      },
      data: {
        ...updateData,
      },
    });
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
