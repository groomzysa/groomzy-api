import { validate } from "isemail";
import bcrypt from "bcrypt";
import { GraphQLYogaError } from "@graphql-yoga/node";

import { IContext } from "resolvers/types";
import { clientMailContent, emailTransport } from "utils";
import { ISignupProviderArgs } from "./types";

const messagingApi = require("@cmdotcom/text-sdk");

export const signupProviderMutation = async (
  _: any,
  signupProviderInput: ISignupProviderArgs,
  ctx: IContext
) => {
  const { fullName, phoneNumber } = signupProviderInput;

  let { email, password } = signupProviderInput;

  const cmMessageApi = new messagingApi.MessageApiClient(
    process.env.CM_SMS || ""
  );

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

    // Check if the user already exists.
    if (
      await ctx.prisma.provider.findUnique({
        where: {
          email,
        },
      })
    ) {
      throw new GraphQLYogaError(
        "Service provider already exists, navigate to signing in."
      );
    }

    // Hash password before stored in the database.
    password = await bcrypt.hash(password, 10);

    const provider = await ctx.prisma.provider.create({
      data: {
        email,
        fullName,
        password,
        phoneNumber,
      },
    });

    const serviceProviderEmailMessage = `You recently signed up to Groomzy.<br />
			This email serves to confirm that your detailes were captured.<br />
		`;

    if (!provider) {
      throw new GraphQLYogaError(
        "Something went wrong when signing up, please try again later."
      );
    }

    let providerSendEmailErrorMessage = "";

    const serviceProviderContentEmail = clientMailContent(
      provider.fullName,
      serviceProviderEmailMessage
    );

    try {
      const serviceProviderEmail = {
        from: "info@groomzy.co.za",
        html: serviceProviderContentEmail,
        subject: "Groomzy signup confirmation",
        to: provider.email,
      };

      await emailTransport.sendMail(serviceProviderEmail);
    } catch (e) {
      providerSendEmailErrorMessage = `We tried to send an email to ${email} but it failed.
			This may be due to an email provided not working.
			Please provide an active email address.

			The signing up was not complete!
			`;
    }

    let providerSendSMSErrorMessage = "";

    try {
      await cmMessageApi.sendTextMessage(
        [phoneNumber],
        "Groomzy",
        "Hello Groomzy!"
      );
    } catch (error) {
      providerSendSMSErrorMessage = `We tried to send an sms to ${phoneNumber} but it failed.
			This may be due to the phone number provided not working.
			Please provide an active phone number.

			The signing up was not complete!
			`;
    }

    if (
      providerSendEmailErrorMessage &&
      providerSendEmailErrorMessage.length > 0
    ) {
      await ctx.prisma.provider.delete({
        where: {
          email,
        },
      });

      throw new GraphQLYogaError(providerSendEmailErrorMessage);
    }

    return {
      message: `All set. Now you can sign in using the credentials you provided sent to: ${provider.email}. Please check your spam folder if email not recieved and report it as "not spam". You will be redirected to signing in.`,
    };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
