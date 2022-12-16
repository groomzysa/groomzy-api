import { GraphQLError } from "graphql";
import { userAuthToken } from "../../../utils/userAuthToken";
import { IContext } from "../../types";
import { IDeleteStaff } from "./types";

export const deleteStaff = async (
  _: any,
  args: IDeleteStaff,
  ctx: IContext
) => {
  const tokenDetails = userAuthToken(ctx);

  if (!tokenDetails) {
    throw new GraphQLError("Unauthorised!");
  }

  try {
    const { staffId } = args;

    return await ctx.prisma.staff.delete({
      where: {
        id: staffId,
      },
    });
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
