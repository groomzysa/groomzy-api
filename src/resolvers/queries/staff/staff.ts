import { GraphQLYogaError } from "@graphql-yoga/node";
import { IContext } from "resolvers/types";
import { IStaffArgs } from "./types";

export const staffQuery = async (
  _: any,
  staffArgs: IStaffArgs,
  ctx: IContext
) => {
  const { id } = staffArgs;

  try {
    return ctx.prisma.staff.findFirst({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
