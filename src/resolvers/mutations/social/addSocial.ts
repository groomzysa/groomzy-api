import { IContext } from "../../types";
import { IAddSocial } from "./types";
import { GraphQLError } from "graphql";
import { userAuthToken } from "../../../utils/userAuthToken";

export const addSocial = async (_: any, args: IAddSocial, ctx: IContext) => {
  try {
    const { name, username } = args;
    const tokenDetails = userAuthToken(ctx);

    if (!tokenDetails) return;

    const { id: userId } = tokenDetails;

    // is name empty
    if (!name) {
      throw new GraphQLError("Social name is required.");
    }

    // is username empty
    if (!username) {
      throw new GraphQLError("Social username is required.");
    }

    return ctx.prisma.social.create({
      data: {
        name,
        username,
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
