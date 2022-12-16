import { GraphQLError } from "graphql";
import { userAuthToken } from "../../../utils/userAuthToken";
import { IContext } from "../../types";
import { IDeleteOperatingTime } from "./types";

export const deleteOperatingTime = async (
  _: any,
  args: IDeleteOperatingTime,
  ctx: IContext
) => {
  const tokenDetails = userAuthToken(ctx);

  if (!tokenDetails) {
    throw new GraphQLError("Unauthorised!");
  }

  try {
    const { operatingTimeId } = args;

    return await ctx.prisma.operatingTime.delete({
      where: {
        id: operatingTimeId,
      },
    });
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
