import { validate } from "isemail";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { ISignIn } from "./types";
import { IContext } from "../../types";
import { GraphQLError } from "graphql";

export const signIn = async (_: any, args: ISignIn, ctx: IContext) => {
  let { email, password, role } = args;

  try {
    // is email format correct and meets the minimu requirement
    if (!validate(email)) {
      throw new GraphQLError("Provided email is invalid.");
    }

    // password is empty
    if (!password) {
      throw new GraphQLError("Password is required");
    }

    // Password should be at least 5 charectors long.
    if (password.length < 5) {
      throw new GraphQLError("Password is too short.");
    }

    // Make email lower case and trim the white spaces.
    email = email.toLocaleLowerCase().trim();

    const user = await ctx.prisma.user.findUnique({
      where: {
        email_role: {
          email,
          role,
        },
      },
      include: {
        address: true,
        provider: {
          include: {
            addresses: true,
          },
        },
      },
    });

    // Check if the user exists.
    if (!user) {
      throw new GraphQLError(
        `User with email ${email} does not exist, please signup first.`
      );
    }

    // Check if user password is correct.
    if (user && !(await bcrypt.compare(password, user.password))) {
      throw new GraphQLError("Invalid password");
    }

    // Check if the JWT secret key is defined.
    if (!process.env.GROOMZY_JWT_SECRET) {
      throw new GraphQLError("Internal server error.");
    }

    // Asign the token
    const token = jwt.sign(
      {
        id: user.id,
        role,
      },
      process.env.GROOMZY_JWT_SECRET
    );

    return { token, user };
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
