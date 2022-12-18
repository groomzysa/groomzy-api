import { GraphQLError } from "graphql";
import { userAuthToken } from "../../../utils/userAuthToken";
import { IContext } from "../../types";
import { IDeleteSocial } from "./types";

export const deleteSocial = async (
  _: any,
  args: IDeleteSocial,
  ctx: IContext
) => {
  const tokenDetails = userAuthToken(ctx);

  if (!tokenDetails) {
    throw new GraphQLError("Unauthorised!");
  }

  try {
    const { socialId } = args;

    return await ctx.prisma.social.delete({
      where: {
        id: socialId,
      },
    });
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
