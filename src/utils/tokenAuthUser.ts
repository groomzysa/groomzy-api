import { GraphQLYogaError } from "@graphql-yoga/node";
import jwt from "jsonwebtoken";

import { IContext } from "resolvers/types";

export const tokenAuthUser = (ctx: IContext) => {
  // Check if an auth header is set.
  const authorizationHeader =
    ctx.request.headers.get("x-access-token") ||
    ctx.request.headers.get("authorization");

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

  const { id, role } = signedIn as { id: number; role: string };

  return {
    id,
    role,
  };
};
