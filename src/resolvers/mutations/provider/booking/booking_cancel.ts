import { GraphQLYogaError } from "@graphql-yoga/node";

import { tokenAuthUser } from "utils";
import { IContext } from "resolvers/types";
import { IProviderCancelBookingArgs } from "./types";

export const providerBookingCancelMutation = async (
  _: any,
  providerCancelBookingArgs: IProviderCancelBookingArgs,
  ctx: IContext
) => {
  tokenAuthUser(ctx);
  const { bookingId, cancel } = providerCancelBookingArgs;

  try {
    // Booking id is required
    if (!bookingId) {
      throw new GraphQLYogaError("Booking id is required.");
    }

    if (!cancel) {
      throw new GraphQLYogaError(
        "Eisther Something went wrong while trying to cancel the booking."
      );
    }

    await ctx.prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: "Cancelled",
      },
    });
    return {
      message: "Booking is now cancelled.",
    };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
