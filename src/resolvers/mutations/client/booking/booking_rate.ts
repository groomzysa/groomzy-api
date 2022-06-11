import { GraphQLYogaError } from "@graphql-yoga/node";

import { tokenAuthUser } from "utils";
import { IContext } from "resolvers/types";
import { IClientRateBookingArgs } from "./types";

export const clientBookingRateMutation = async (
  _: any,
  clientRateBookingInput: IClientRateBookingArgs,
  ctx: IContext
) => {
  tokenAuthUser(ctx);
  const { bookingId, rate, comment, ratingId } = clientRateBookingInput;

  try {
    // Booking id is required
    if (!bookingId) {
      throw new GraphQLYogaError("Booking id is required.");
    }

    if (ratingId && ratingId != 0) {
      await ctx.prisma.booking.update({
        where: {
          id: bookingId,
        },
        data: {
          rating: {
            update: {
              rate,
              comment,
            },
          },
        },
      });
    } else {
      await ctx.prisma.booking.update({
        where: {
          id: bookingId,
        },
        data: {
          rating: {
            create: {
              rate,
              comment,
            },
          },
        },
      });
    }

    return {
      message: "Booking rated, thank you.",
    };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
