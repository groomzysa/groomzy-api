import { GraphQLError } from "graphql";
import { IContext } from "../types";

export const providers = async (_: any, __: any, ctx: IContext) => {
  try {
    return ctx.prisma.provider.findMany({
      include: {
        addresses: true,
        operatingTimes: true,
        socials: true,
      },
    });
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
