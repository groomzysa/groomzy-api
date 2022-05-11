import jwt from "jsonwebtoken";
import { GraphQLYogaError } from "@graphql-yoga/node";
import { IContext } from "resolvers/types";

export const clientQuery = async (_: any, __: any, ctx: IContext) => {
  try {
    // Check if an auth header is set.
    const authorizationHeader =
      ctx.request.headers.get("x-access-token") ||
      ctx.request.headers.get("authorization");

    // TODO: Should we throw an Error instead?

    if (!authorizationHeader) {
      return null;
    }

    // Check if the JWT secret key is defined.
    if (!process.env.GROOMZY_JWT_SECRET) {
      throw new GraphQLYogaError("Internal server error.");
    }

    // Get the token.
    const token = authorizationHeader.split(" ")[1];
    // Verify the token if it is valid.
    const signedIn = jwt.verify(token, process.env.GROOMZY_JWT_SECRET);

    const { id } = signedIn as { id: number; role: string };

    return ctx.prisma.client.findUnique({
      where: { id },
      include: { address: true },
    });
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
