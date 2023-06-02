import { GraphQLError } from "graphql";
import { IContext } from "../../types";
import { IProviders } from "./types";

export const providers = async (_: any, args: IProviders, ctx: IContext) => {
  try {
    const { search } = args;
    if (search) {
      return ctx.prisma.provider.findMany({
        where: {
          OR: {
            tradingName: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
        include: {
          addresses: true,
          operatingTimes: true,
          socials: true,
          staffs: true,
        },
      });
    }

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
