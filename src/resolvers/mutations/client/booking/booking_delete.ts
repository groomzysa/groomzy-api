import jwt from "jsonwebtoken";

import { IClientDeleteBookingArgs } from "./types";

import { IContext } from "../../../types";
import { GraphQLYogaError } from "@graphql-yoga/node";

export const clientBookingDeleteMutation = async (
  _: any,
  clientDeleteBookingInput: IClientDeleteBookingArgs,
  ctx: IContext
) => {
  const { bookingId, delete: deleteBooking } = clientDeleteBookingInput;

  try {
    // Booking id is required
    if (!bookingId) {
      throw new GraphQLYogaError("Booking id is required.");
    }

    // Check if an auth header is set.
    const authorizationHeader =
      ctx.request.headers.get("x-access-token") ||
      ctx.request.headers.get("authorization");

    // TODO: Should we throw an Error instead?

    if (!authorizationHeader) {
      throw new GraphQLYogaError(
        "Looks like you are not signed in. Please sign in."
      );
    }

    // Check if the JWT secret key is defined.
    if (!process.env.GROOMZY_JWT_SECRET) {
      throw new GraphQLYogaError("Internal server error.");
    }

    // Get the token.
    const token = authorizationHeader.split(" ")[1];
    // Verify the token if it is valid.
    const signedIn = jwt.verify(token, process.env.GROOMZY_JWT_SECRET);

    const { id: clientId, role } = signedIn as { id: number; role: string };

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
