import { Provider, UserRole } from "@prisma/client";
import { GraphQLError } from "graphql";
import { userAuthToken } from "../../../utils/userAuthToken";
import { IContext } from "../../types";
import { IProvider } from "./types";

export const provider = async (_: any, args: IProvider, ctx: IContext) => {
  try {
    const tokenDetails = userAuthToken(ctx);
    const { providerId } = args;

    let provider: Provider | null;

    if (!tokenDetails || tokenDetails.role !== UserRole.PROVIDER) {
      provider = await ctx.prisma.provider.findUnique({
        where: {
          id: providerId,
        },
        include: {
          addresses: true,
          operatingTimes: true,
        },
      });
    } else {
      const { id: userId } = tokenDetails!;
      provider = await ctx.prisma.provider.findUnique({
        where: {
          userId,
        },
        include: {
          addresses: true,
        },
      });
    }

    return provider;
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
