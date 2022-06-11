import { GraphQLYogaError } from "@graphql-yoga/node";

import { tokenAuthUser } from "utils";
import { IContext } from "resolvers/types";
import { IClientCancelBookingArgs } from "./types";

export const clientBookingCancelMutation = async (
  _: any,
  clientCancelBookingInput: IClientCancelBookingArgs,
  ctx: IContext
) => {
  tokenAuthUser(ctx);

  const { bookingId, cancel } = clientCancelBookingInput;

  try {
    // Booking id is required
    if (!bookingId) {
      throw new Error("Booking id is required.");
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
      message: "Booking cancelled successfully.",
    };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
