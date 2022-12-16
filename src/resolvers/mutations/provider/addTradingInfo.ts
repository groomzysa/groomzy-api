import { GraphQLError } from "graphql";
import { userAuthToken } from "../../../utils/userAuthToken";
import { IContext } from "../../types";
import { IAddTradingInfo } from "./types";

export const addTradingInfo = async (
  _: any,
  args: IAddTradingInfo,
  ctx: IContext
) => {
  const tokenDetails = userAuthToken(ctx);

  if (!tokenDetails) {
    throw new GraphQLError("Unauthorised!");
  }

  const { id } = tokenDetails;

  try {
    const { tradingName, phone } = args;

    // is trading name empty
    if (!tradingName) {
      throw new GraphQLError("Trading name is required.");
    }

    // is phone name empty
    if (!phone) {
      throw new GraphQLError("Contact phone number is required.");
    }

    return await ctx.prisma.provider.create({
      data: {
        tradingName,
        phone,
        user: {
          connect: {
            id,
          },
        },
      },
    });
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
