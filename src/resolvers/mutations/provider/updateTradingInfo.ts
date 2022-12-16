import { GraphQLError } from "graphql";
import { userAuthToken } from "../../../utils/userAuthToken";
import { IContext } from "../../types";
import { IUpdateTradingInfo } from "./types";

export const updateTradingInfo = async (
  _: any,
  args: IUpdateTradingInfo,
  ctx: IContext
) => {
  const tokenDetails = userAuthToken(ctx);

  if (!tokenDetails) {
    throw new GraphQLError("Unauthorised!");
  }

  try {
    const { providerId, tradingName, phone } = args;
    const updateData: Omit<IUpdateTradingInfo, "providerId"> = {};

    // update trading name
    if (tradingName) {
      updateData.tradingName = tradingName;
    }

    // update phone
    if (phone) {
      updateData.phone = phone;
    }

    return await ctx.prisma.provider.update({
      where: {
        id: providerId,
      },
      data: {
        ...updateData,
      },
    });
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
