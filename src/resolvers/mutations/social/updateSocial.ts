import { GraphQLError } from "graphql";
import { userAuthToken } from "../../../utils/userAuthToken";
import { IContext } from "../../types";
import { IUpdateSocial } from "./types";

export const updateSocial = async (
  _: any,
  args: IUpdateSocial,
  ctx: IContext
) => {
  const tokenDetails = userAuthToken(ctx);

  if (!tokenDetails) {
    throw new GraphQLError("Unauthorised!");
  }

  try {
    const { socialId, name, username } = args;
    const updateData: Omit<IUpdateSocial, "socialId"> = {};

    // update name
    if (name) {
      updateData.name = name;
    }

    // update username
    if (username) {
      updateData.username = username;
    }

    return ctx.prisma.social.update({
      where: {
        id: socialId,
      },
      data: {
        ...updateData,
      },
    });
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
