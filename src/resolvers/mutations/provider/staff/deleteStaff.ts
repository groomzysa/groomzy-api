import { GraphQLYogaError } from "@graphql-yoga/node";
import jwt from "jsonwebtoken";

import { IContext } from "../../../types";
import { IDeleteStaffArgs } from "./types";

export const deleteStaffMutation = async (
  _: any,
  deleteStaffInput: IDeleteStaffArgs,
  ctx: IContext
) => {
  const { staffId } = deleteStaffInput;

  try {
    // Staff id is required
    if (!staffId) {
      throw new GraphQLYogaError("Staff id is required.");
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

    await ctx.prisma.staff.delete({
      where: {
        id: staffId,
      },
    });

    return {
      message: "Service deleted successfully",
    };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
