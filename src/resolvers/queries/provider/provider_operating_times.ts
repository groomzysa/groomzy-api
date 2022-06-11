import { GraphQLYogaError } from "@graphql-yoga/node";
import { IContext } from "resolvers/types";

export const providerOperatingTimesQuery = async (
  _: any,
  providerOperatingTimesArgs: { providerId: number },
  ctx: IContext
) => {
  const { providerId } = providerOperatingTimesArgs;
  try {
    return ctx.prisma.dayTime.findMany({
      where: {
        providerId,
      },
      include: {
        day: true,
        time: true,
      },
    });

    // return ctx.prisma.provider.findFirst({
    //   where: {
    //     id: providerId,
    //   },
    //   select: {
    //     dayTimes: {
    //       include: {
    //         day: true,
    //         time: true,
    //       },
    //     },
    //   },
    // });
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
