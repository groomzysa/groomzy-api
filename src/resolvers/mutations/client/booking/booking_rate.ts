import jwt from "jsonwebtoken";
import { GraphQLYogaError } from "@graphql-yoga/node";

import { IContext } from "resolvers/types";
import { IClientRateBookingArgs } from "./types";

export const clientBookingRateMutation = async (
  _: any,
  clientRateBookingInput: IClientRateBookingArgs,
  ctx: IContext
) => {
  const { bookingId, rate, comment, ratingId } = clientRateBookingInput;

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
