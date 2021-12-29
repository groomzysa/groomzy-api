import jwt from "jsonwebtoken";

import { IClientCancelBookArgs } from "./types";

import { IContext } from "../../types";

export const clientBookCancelMutation = async (
  _: any,
  cancelBookInput: IClientCancelBookArgs,
  ctx: IContext
) => {
  const { bookingId, cancel } = cancelBookInput;

  try {
    // Booking id is required
    if (!bookingId) {
      throw new Error("Booking id is required.");
    }

    // Check if an auth header is set.
    const authorizationHeader =
      ctx.request.headers["x-access-token"] ||
      ctx.request.headers.authorization;

    // TODO: Should we throw an Error instead?

    if (!authorizationHeader) {
      throw new Error("Looks like you are not signed in. Please sign in.");
    }

    // Check if the JWT secret key is defined.
    if (!process.env.GROOMZY_JWT_SECRET) {
      throw Error("Internal server error.");
    }

    // Get the token.
    const token = authorizationHeader.split(" ")[1];
    // Verify the token if it is valid.
    const signedIn = jwt.verify(token, process.env.GROOMZY_JWT_SECRET);

    const { id: clientId, role } = signedIn as { id: number; role: string };

    if (!cancel) {
      throw Error(
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
    throw new Error(error.message);
  }
};
