import { GraphQLYogaError } from "@graphql-yoga/node";

import { tokenAuthUser } from "utils";
import { IContext } from "resolvers/types";
import { IProviderDoneBookingArgs } from "./types";

export const providerBookingDoneMutation = async (
  _: any,
  providerDoneBookingInput: IProviderDoneBookingArgs,
  ctx: IContext
) => {
  tokenAuthUser(ctx);
  const { bookingId, done } = providerDoneBookingInput;

  try {
    // Booking id is required
    if (!bookingId) {
      throw new GraphQLYogaError("Booking id is required.");
    }

    if (!done) {
      throw new GraphQLYogaError(
        "Eisther Something went wrong while trying to cancel the booking."
      );
    }

    await ctx.prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: "Done",
      },
    });
    return {
      message: "Booking is now done.",
    };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
