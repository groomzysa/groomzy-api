import { GraphQLError } from "graphql";
import { userAuthToken } from "../../../utils/userAuthToken";
import { IContext } from "../../types";
import { IUpdateOperatingTime } from "./types";

export const updateOperatingTime = async (
  _: any,
  args: IUpdateOperatingTime,
  ctx: IContext
) => {
  const tokenDetails = userAuthToken(ctx);

  if (!tokenDetails) {
    throw new GraphQLError("Unauthorised!");
  }

  try {
    const { operatingTimeId, closes, day, opens } = args;
    const updateData: Omit<IUpdateOperatingTime, "operatingTimeId"> = {};

    // update day
    if (day) {
      updateData.day = day;
    }

    // update opens
    if (opens) {
      updateData.opens = opens;
    }

    // update closes
    if (closes) {
      updateData.closes = closes;
    }

    return await ctx.prisma.operatingTime.update({
      where: {
        id: operatingTimeId,
      },
      data: {
        ...updateData,
      },
    });
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
