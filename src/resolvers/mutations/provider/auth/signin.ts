import { validate } from "isemail";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { GraphQLYogaError } from "@graphql-yoga/node";

import { IContext } from "resolvers/types";
import { ISignInProviderArgs } from "./types";

export const signinProviderMutation = async (
  _: any,
  providerSigninInput: ISignInProviderArgs,
  ctx: IContext
) => {
  const { verifyPin } = providerSigninInput;

  let { email, password } = providerSigninInput;

  try {
    // is email empty
    if (!email || email.length < 1) {
      throw new GraphQLYogaError("Email is required.");
    }

    // is email format correct and meets the minimu requirement
    if (!validate(email)) {
      throw new GraphQLYogaError("Provided email is invalid.");
    }

    // password is empty
    if (!password) {
      throw new GraphQLYogaError("Password is required");
    }

    // Password should be at least 5 charectors long.
    if (password.length < 5) {
      throw new GraphQLYogaError("Password must be 5 charectors long.");
    }

    // Make email lower case and trim the white spaces.
    email = email.toLocaleLowerCase().trim();

    const user = await ctx.prisma.provider.findUnique({
      where: {
        email,
      },
      include: {
        address: true,
      },
    });

    // Check if the user exists.
    if (!user) {
      throw new GraphQLYogaError(
        `Service provider with email ${email} does not exist, please signup first.`
      );
    }

    // Check if user password is correct.
    if (user && !(await bcrypt.compare(password, user.password))) {
      throw new GraphQLYogaError("Invalid password");
    }

    // Check if the JWT secret key is defined.
    if (!process.env.GROOMZY_JWT_SECRET) {
      throw new GraphQLYogaError("Internal server error.");
    }

    // Asign the token
    const token = jwt.sign(
      {
        id: user.id,
        role: "Provider",
      },
      process.env.GROOMZY_JWT_SECRET
    );

    return { token, role: "Provider", ...user };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
