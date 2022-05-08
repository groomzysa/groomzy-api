import { GraphQLYogaError } from "@graphql-yoga/node";
import { IContext } from "resolvers/types";

export const clientBookingsQuery = async (
  _: any,
  clientBookingsArgs: { clientId: number },
  ctx: IContext
) => {
  const { clientId } = clientBookingsArgs;
  try {
    return ctx.prisma.client.findFirst({
      where: {
        id: clientId,
      },
      select: {
        bookings: {
          where: {
            status: {
              not: "Deleted",
            },
          },
          include: {
            provider: {
              select: {
                id: true,
                fullName: true,
              },
            },
            rating: true,
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
