import { IContext } from "../../types";
import { IAddStaff } from "./types";
import { GraphQLError } from "graphql";
import { userAuthToken } from "../../../utils/userAuthToken";

export const addStaff = async (_: any, args: IAddStaff, ctx: IContext) => {
  try {
    const { firstName, lastName } = args;
    const tokenDetails = userAuthToken(ctx);

    if (!tokenDetails) return;

    const { id: userId } = tokenDetails;

    // is first name empty
    if (!firstName) {
      throw new GraphQLError("First name is required.");
    }

    // is last name empty
    if (!lastName) {
      throw new GraphQLError("Last name is required.");
    }

    return ctx.prisma.staff.create({
      data: {
        firstName,
        lastName,
        provider: {
          connect: {
            userId
          }
        }
      },
    });
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
