import { GraphQLYogaError } from "@graphql-yoga/node";
import moment from "moment";
import bcrypt from "bcrypt";

import { emailTransport, clientMailContent } from "utils";
import { IContext } from "resolvers/types";

import { IResetPasswordArgs } from "./types";

export const resetPasswordMutation = async (
  _: any,
  resetPasswordArgs: IResetPasswordArgs,
  ctx: IContext
) => {
  const { oneTimePin, isProvider } = resetPasswordArgs;
  let { password } = resetPasswordArgs;

  try {
    // is OTP empty
    if (!oneTimePin) {
      throw new GraphQLYogaError("OTP is required. Please check your emails.");
    }

    let user;

    if (isProvider) {
      const providerPasswordReset =
        await ctx.prisma.providerPasswordReset.findUnique({
          where: {
            oneTimePin,
          },
        });

      if (
        !providerPasswordReset ||
        moment(Date.now()).toDate().getTime() >
          providerPasswordReset.resetTokenExpiry.getTime()
      ) {
        throw new Error(
          "This OTP is either invalid or expired. \nPlease re-request another one."
        );
      }

      // Hash the new password
      password = await bcrypt.hash(password, 10);

      user = await ctx.prisma.provider.update({
        where: {
          id: providerPasswordReset.providerId,
        },
        data: {
          password,
        },
      });
    } else {
      const clientPasswordReset =
        await ctx.prisma.clientPasswordReset.findUnique({
          where: {
            oneTimePin,
          },
        });

      if (
        !clientPasswordReset ||
        moment(Date.now()).toDate().getTime() >
          clientPasswordReset.resetTokenExpiry.getTime()
      ) {
        throw new Error(
          "This OTP is either invalid or expired. \nPlease re-request another one."
        );
      }

      // Hash the new password
      password = await bcrypt.hash(password, 10);

      user = await ctx.prisma.client.update({
        where: {
          id: clientPasswordReset.clientId,
        },
        data: {
          password,
        },
      });
    }

    const message = `
      Password updated successfully.
    `;

    const contentEmail = clientMailContent(user.fullName, message);

    const toClientEmail = {
      from: "info@groomzy.co.za",
      html: contentEmail,
      subject: "Password reset succeeded.",
      to: user.email,
    };

    await emailTransport.sendMail(toClientEmail);

    return {
      message: "Password change was successful.",
    };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
