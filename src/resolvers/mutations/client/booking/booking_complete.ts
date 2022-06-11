import { GraphQLYogaError } from "@graphql-yoga/node";

import { tokenAuthUser } from "utils";
import { IContext } from "resolvers/types";
import { IClientCompleteBookingArgs } from "./types";

export const clientBookingCompleteMutation = async (
  _: any,
  clientCompleteBookingInput: IClientCompleteBookingArgs,
  ctx: IContext
) => {
  tokenAuthUser(ctx);
  const { bookingId, complete } = clientCompleteBookingInput;

  try {
    // Booking id is required
    if (!bookingId) {
      throw new GraphQLYogaError("Booking id is required.");
    }

    if (!complete) {
      throw new GraphQLYogaError(
        "Eisther Something went wrong while trying to complete the booking or the booking was cancelled."
      );
    }

    await ctx.prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: "Active",
      },
    });
    return {
      message: "Booking completed successfully.",
    };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
