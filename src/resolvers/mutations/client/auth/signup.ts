import { validate } from "isemail";
import bcrypt from "bcrypt";
import { GraphQLYogaError } from "@graphql-yoga/node";

import { IContext } from "resolvers/types";
import { emailTransport, clientMailContent } from "utils";
import { ISignupClientArgs } from "./types";

export const signupClientMutation = async (
  _: any,
  clientSignupInput: ISignupClientArgs,
  ctx: IContext
) => {
  const { fullName, phoneNumber } = clientSignupInput;

  let { email, password } = clientSignupInput;

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

    // Check if the iser already exists.
    if (
      await ctx.prisma.client.findUnique({
        where: {
          email,
        },
      })
    ) {
      throw new GraphQLYogaError(
        "Client already exists, navigate to signing in."
      );
    }

    // Hash password before stored in the database.
    password = await bcrypt.hash(password, 10);

    const client = await ctx.prisma.client.create({
      data: {
        email,
        fullName,
        password,
        phoneNumber,
      },
    });

    const clientEmailMessage = `You recently signed up to Groomzy.<br />
			This email serves to confirm that your detailes were captured.<br />
		`;

    if (!client) {
      throw new GraphQLYogaError(
        "Something went wrong when signing up, please try again later."
      );
    }

    let clientSendEmailErrorMessage = "";

    const clientContentEmail = clientMailContent(
      client.fullName,
      clientEmailMessage
    );

    try {
      const clientEmail = {
        from: "info@groomzy.co.za",
        html: clientContentEmail,
        subject: "Groomzy signup confirmation",
        to: client.email,
      };

      await emailTransport.sendMail(clientEmail);
    } catch (e) {
      clientSendEmailErrorMessage = `We tried to send an email to ${email} but it failed.
			This may be due to an email provided not working.
			Please provide an active email address.

			The signing up was not complete!
			`;
    }

    if (clientSendEmailErrorMessage && clientSendEmailErrorMessage.length > 0) {
      await ctx.prisma.client.delete({
        where: {
          email,
        },
      });

      throw new GraphQLYogaError(clientSendEmailErrorMessage);
    }

    return {
      message: `All set. Now you can sign in using the credentials you provided sent to: ${client.email}. Please check your spam folder if email not recieved and report it as "not spam". You will be redirected to signing in.`,
    };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
