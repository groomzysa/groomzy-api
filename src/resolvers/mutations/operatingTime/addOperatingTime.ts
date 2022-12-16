import { IContext } from "../../types";
import { IAddOperatingTime } from "./types";
import { GraphQLError } from "graphql";
import { userAuthToken } from "../../../utils/userAuthToken";

export const addOperatingTime = async (
  _: any,
  args: IAddOperatingTime,
  ctx: IContext
) => {
  try {
    const { day, closes, opens } = args;
    const tokenDetails = userAuthToken(ctx);

    if (!tokenDetails) return;

    const { id: userId } = tokenDetails;

    // is day empty
    if (!day) {
      throw new GraphQLError("Trading day is required.");
    }

    // is opens empty
    if (!opens) {
      throw new GraphQLError("Opening time is required.");
    }

    // is closes empty
    if (!closes) {
      throw new GraphQLError("Cosing time is required");
    }

    return ctx.prisma.operatingTime.create({
      data: {
        day,
        closes,
        opens,
        provider: {
          connect: {
            userId,
          },
        },
      },
    });
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
