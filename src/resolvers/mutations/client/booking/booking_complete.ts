import jwt from "jsonwebtoken";
import { GraphQLYogaError } from "@graphql-yoga/node";

import { IContext } from "resolvers/types";

import { IClientCompleteBookingArgs } from "./types";

export const clientBookingCompleteMutation = async (
  _: any,
  clientCompleteBookingInput: IClientCompleteBookingArgs,
  ctx: IContext
) => {
  const { bookingId, complete } = clientCompleteBookingInput;

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
