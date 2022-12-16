import { GraphQLError } from "graphql";
import { userAuthToken } from "../../utils/userAuthToken";
import { IContext } from "../types";

export const provider = async (_: any, __: any, ctx: IContext) => {
  try {
    const tokenDetails = userAuthToken(ctx);

    if (!tokenDetails) {
      throw new GraphQLError("Unauthorised!");
    }

    const { id: userId } = tokenDetails;

    return ctx.prisma.provider.findUnique({
      where: {
        userId,
      },
      include: {
        addresses: true,
      },
    });
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
