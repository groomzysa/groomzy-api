import { GraphQLYogaError } from "@graphql-yoga/node";
import { IContext } from "resolvers/types";

export const providerBookingsQuery = async (
  _: any,
  providerBookingsArgs: { providerId: number },
  ctx: IContext
) => {
  const { providerId } = providerBookingsArgs;
  try {
    return ctx.prisma.provider.findFirst({
      where: {
        id: providerId,
      },
      select: {
        bookings: {
          include: {
            client: true,
            staff: true,
            service: true,
          },
        },
      },
    });
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
