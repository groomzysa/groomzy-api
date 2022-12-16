import { UserRole } from "@prisma/client";
import { GraphQLError } from "graphql";
import { userAuthToken } from "../../utils/userAuthToken";
import { IContext } from "../types";

export const operatingTimes = async (_: any, __: any, ctx: IContext) => {
  try {
    const tokenDetails = userAuthToken(ctx);

    if (!tokenDetails || tokenDetails.role !== UserRole.PROVIDER) {
      return ctx.prisma.operatingTime.findMany();
    }

    const { id: userId } = tokenDetails;

    return ctx.prisma.operatingTime.findMany({
      where: {
        provider: {
          userId,
        },
      },
    });
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
