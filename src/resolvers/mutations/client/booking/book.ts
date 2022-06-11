import { GraphQLYogaError } from "@graphql-yoga/node";

import { tokenAuthUser } from "utils";
import { IContext } from "resolvers/types";
import { IClientBookArgs } from "./types";

export const clientBookMutation = async (
  _: any,
  bookInput: IClientBookArgs,
  ctx: IContext
) => {
  const { id: clientId } = tokenAuthUser(ctx);
  const {
    providerId,
    serviceId,
    staffId,
    bookingDate,
    bookingTime,
    inHouse,
    address,
  } = bookInput;

  try {
    // Provider id is required
    if (!providerId) {
      throw new GraphQLYogaError("Provider id is required.");
    }

    // Service id is required
    if (!serviceId) {
      throw new GraphQLYogaError("Service id is required.");
    }

    // Staff id is required
    if (!staffId) {
      throw new GraphQLYogaError("staff id is required.");
    }

    // Booking date is required
    if (!bookingDate) {
      throw new GraphQLYogaError("Booking date is required.");
    }

    // Booking time is required
    if (!bookingTime) {
      throw new GraphQLYogaError("Booking time is required.");
    }

    // Address required if in house call.
    if (inHouse) {
      if (!address) {
        throw new GraphQLYogaError(
          "In house call requires an address to be provided."
        );
      }
    }

    const bookingDateTime = new Date(`${bookingDate} ${bookingTime}`);

    return ctx.prisma.booking.create({
      data: {
        clientId,
        providerId,
        serviceId,
        staffId,
        status: "Pending",
        bookingTime: bookingDateTime,
        inHouse,
      },
    });
  } catch (error) {
    if (error.message.includes("jwt")) {
      throw new GraphQLYogaError("To make a booking, please sign in.");
    }
    throw new GraphQLYogaError(error.message);
  }
};
