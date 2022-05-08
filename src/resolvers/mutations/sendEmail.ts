import { validate } from "isemail";
import { GraphQLYogaError } from "@graphql-yoga/node";

import { mailContent, emailTransport } from "utils/mailServices";

import { ISendEmailArgs } from "./types";

export const sendEmailMutation = async (
  _: any,
  sendEmailArgs: ISendEmailArgs,
  __: any
) => {
  const { fullName, message, subject } = sendEmailArgs;

  let { email } = sendEmailArgs;

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

    const contentEmail = mailContent(fullName, message);

    try {
      const clientEmail = {
        from: email,
        html: contentEmail,
        subject: subject,
        to: "info@groomzy.co.za",
      };

      await emailTransport.sendMail(clientEmail);
    } catch (e) {
      throw new GraphQLYogaError(
        "Email could not be sent. Please try agin later."
      );
    }

    return {
      message: "Email sent, we will be in touch ASAP!",
    };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
