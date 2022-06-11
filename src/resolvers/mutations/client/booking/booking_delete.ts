import { GraphQLYogaError } from "@graphql-yoga/node";

import { tokenAuthUser } from "utils";
import { IContext } from "resolvers/types";
import { IClientDeleteBookingArgs } from "./types";

export const clientBookingDeleteMutation = async (
  _: any,
  clientDeleteBookingInput: IClientDeleteBookingArgs,
  ctx: IContext
) => {
  tokenAuthUser(ctx);
  const { bookingId, delete: deleteBooking } = clientDeleteBookingInput;

  try {
    // Booking id is required
    if (!bookingId) {
      throw new GraphQLYogaError("Booking id is required.");
    }

    if (!deleteBooking) {
      throw new GraphQLYogaError(
        "Eisther Something went wrong while trying to delete the booking."
      );
    }

    await ctx.prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: "Deleted",
      },
    });
    return {
      message: "Booking deleted successfully.",
    };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
