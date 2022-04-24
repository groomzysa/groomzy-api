import { GraphQLYogaError } from "@graphql-yoga/node";
import jwt from "jsonwebtoken";

import { IContext } from "../../../types";
import { IAddStaffArgs } from "./types";

export const addStaffMutation = async (
  _: any,
  addStaffInput: IAddStaffArgs,
  ctx: IContext
) => {
  const { fullName } = addStaffInput;

  try {
    // Full name is required
    if (!fullName) {
      throw new GraphQLYogaError("Full name is required.");
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

    const { id: providerId, role } = signedIn as { id: number; role: string };

    await ctx.prisma.staff.create({
      data: {
        fullName,
        provider: {
          connect: {
            id: providerId,
          },
        },
      },
    });

    return {
      message: "Staff added successfully",
    };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
