import { GraphQLError } from "graphql";
import { validate } from "isemail";
import { userAuthToken } from "../../../utils/userAuthToken";
import { IContext } from "../../types";
import { IUpdateAccount } from "./types";

export const updateAccount = async (
  _: any,
  args: IUpdateAccount,
  ctx: IContext
) => {
  const tokenDetails = userAuthToken(ctx);

  if (!tokenDetails) {
    throw new GraphQLError("Unauthorised!");
  }

  try {
    let { email, password } = args;
    const { id } = tokenDetails;
    const { firstName, lastName } = args;
    const updateData: IUpdateAccount = {};

    // update first name
    if (firstName) {
      updateData.firstName = firstName;
    }

    // update last name
    if (lastName) {
      updateData.lastName = lastName;
    }

    // if (email) {
    //   // is email format correct and conform to the minimum requirement
    //   if (!validate(email)) {
    //     throw new GraphQLError("Email is invalid.");
    //   }

    //   // Tranform email to lower cases and trim the white spaces.
    //   email = email.toLocaleLowerCase().trim();

    //   const currentUser = await ctx.prisma.user.findUnique({
    //     where: {
    //       id,
    //     },
    //   });

    //   // Check if the user already exists and the email is.
    //   if (currentUser && currentUser.email !== email) {
    //     throw new GraphQLError("Email already used by another user.");
    //   }

    //   updateData.email = email;
    // }

    // update password
    if (password) {
      // Password should be at least 5 charectors long.
      if (password.length < 5) {
        throw new GraphQLError("Password must be 5 charectors long.");
      }

      updateData.password = password;
    }

    return await ctx.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updateData,
      },
    });
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
