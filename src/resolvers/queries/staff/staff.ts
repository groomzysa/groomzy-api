import { GraphQLError } from "graphql";
import { IContext } from "../../types";
import { IStaff } from "./types";

export const staff = async (_: any, args: IStaff, ctx: IContext) => {
  try {
    const { staffId } = args;

    if (!staffId) {
      throw new GraphQLError("Staff id is required.");
    }

    return ctx.prisma.staff.findUnique({
      where: {
        id: staffId,
      },
    });
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
