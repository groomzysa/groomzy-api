import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import { IContext } from "../resolvers/types";

export const userAuthToken = (ctx: IContext) => {
  // Check if an auth header is set.
  const authorizationHeader =
    ctx.request.headers.get("x-access-token") ||
    ctx.request.headers.get("authorization");

  if (!authorizationHeader) {
    return;
  }

  // Check if the JWT secret key is defined.
  if (!process.env.GROOMZY_JWT_SECRET) {
    throw new GraphQLError("Internal server error.");
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
