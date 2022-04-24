import { GraphQLYogaError } from "@graphql-yoga/node";
import { BusinessDay } from "@prisma/client";
import jwt from "jsonwebtoken";

import { IContext } from "../../../types";
import { IEditOperatingTimeArgs } from "./types";

export const editOperatingTimeMutation = async (
  _: any,
  editOperatingTimeInput: IEditOperatingTimeArgs,
  ctx: IContext
) => {
  const { dayTimeId, day, startTime, endTime } = editOperatingTimeInput;

  const dayTimeToUpdate: Omit<IEditOperatingTimeArgs, "dayTimeId" | "day"> = {};

  try {
    // Start time to update
    if (startTime) {
      dayTimeToUpdate.startTime = startTime;
    }

    // End time to update
    if (endTime) {
      dayTimeToUpdate.endTime = endTime;
    }

    try {
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

      const { id: providerId, role } = signedIn as { id: number; role: string };

      await ctx.prisma.dayTime.update({
        where: {
          id: dayTimeId,
        },
        data: {
          time: {
            update: dayTimeToUpdate,
          },
        },
      });

      return {
        message: "Day time updated successfully",
      };
    } catch (error) {
      throw new GraphQLYogaError(error.message);
    }
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
