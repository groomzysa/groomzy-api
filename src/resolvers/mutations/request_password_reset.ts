import { validate } from "isemail";
import { GraphQLYogaError } from "@graphql-yoga/node";
import moment from "moment";

import { emailTransport, clientMailContent } from "utils";
import { IContext } from "resolvers/types";

import { IRequestResetPasswordArgs } from "./types";

export const requestResetPasswordMutation = async (
  _: any,
  requestResetPasswordArgs: IRequestResetPasswordArgs,
  ctx: IContext
) => {
  const { isProvider } = requestResetPasswordArgs;

  let { email } = requestResetPasswordArgs;

  try {
    // is email empty
    if (!email || email.length < 1) {
      throw new GraphQLYogaError("Email is required.");
    }

    // is email format correct and meets the minimu requirement
    if (!validate(email)) {
      throw new GraphQLYogaError("Provided email is invalid.");
    }

    // Make email lower case and trim the white spaces.
    email = email.toLocaleLowerCase().trim();
    let user;

    // Set a reset one time pin and expiry on that user
    const oneTimePin = (Math.random() * 10000).toFixed();
    const resetTokenExpiry = moment(Date.now()).add(30, "minutes").toDate();

    // Check if this is a real user
    if (isProvider) {
      user = await ctx.prisma.provider.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        throw new GraphQLYogaError(`No such user found for email ${email}`);
      }

      await ctx.prisma.providerPasswordReset.upsert({
        where: {
          providerId: user.id,
        },
        update: {
          oneTimePin,
          resetTokenExpiry,
        },
        create: {
          provider: {
            connect: {
              id: user.id,
            },
          },
          oneTimePin,
          resetTokenExpiry,
        },
      });
    } else {
      user = await ctx.prisma.client.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new GraphQLYogaError(`No such user found for email ${email}`);
      }

      await ctx.prisma.clientPasswordReset.upsert({
        where: {
          clientId: user.id,
        },
        update: {
          oneTimePin,
          resetTokenExpiry,
        },
        create: {
          client: {
            connect: {
              id: user.id,
            },
          },
          oneTimePin,
          resetTokenExpiry,
        },
      });
    }

    const message = `
      Someone (probably you) has requested to reset your password for the Groomzy account.<br><br>
      Please use the OTP below to change the password:<br><br>
      OTP: ${oneTimePin}<br><br>
      If you have not requested to reset your password there is no need for any action from your side.
    `;

    const contentEmail = clientMailContent(user.fullName, message);

    const toClientEmail = {
      from: "info@groomzy.co.za",
      html: contentEmail,
      subject: "Password reset request",
      to: user.email,
    };

    await emailTransport.sendMail(toClientEmail);

    return {
      message:
        "A request to change password was successfully, please check your emails for instrunctions.",
    };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
