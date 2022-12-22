import { GraphQLError } from "graphql";
import moment from "moment";
import path from "path";
import hbs from "nodemailer-express-handlebars";
import { getTransporter } from "../../../utils/mail/transporter";
import { IContext } from "../../types";
import { IRequestPasswordReset } from "./types";
import { validate } from "isemail";

export const requestPasswordReset = async (
  _: any,
  args: IRequestPasswordReset,
  ctx: IContext
) => {
  try {
    const pathToViews = "../../../utils/mail/views";
    const pathToPartials = "../../../utils/mail/partials";
    const transporter = getTransporter({
      host: process.env.GROOMZY_HOST || "",
      user: process.env.GROOMZY_USER || "",
      pass: process.env.GROOMZY_PASS || "",
    });
    const viewPath = path.resolve(__dirname, pathToViews);
    const partialsPath = path.resolve(__dirname, pathToPartials);

    const { role } = args;
    let { email } = args;

    transporter.use(
      "compile",
      hbs({
        viewEngine: {
          layoutsDir: viewPath,
          partialsDir: partialsPath,
          extname: ".handlebars",
          defaultLayout: "requestResetPassword",
        },
        viewPath: viewPath,
        extName: ".handlebars",
      })
    );

    // is email format correct and meets the minimu requirement
    if (!validate(email)) {
      throw new GraphQLError("Provided email is invalid.");
    }

    if (!role) {
      throw new Error(`User role is required.`);
    }

    // Transform email address to lowercase.
    email = email.trim().toLowerCase();

    // Check if this is a real user
    const user = await ctx.prisma.user.findUnique({
      where: {
        email_role: {
          email,
          role,
        },
      },
    });

    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }

    // Set a reset one time pin and expiry on that user
    const passwordResetOTP = (Math.random() * 10000).toFixed();

    const passwordResetOTPExpire = moment(Date.now())
      .add(30, "minutes")
      .toDate();

    await ctx.prisma.user.update({
      data: { passwordResetOTP, passwordResetOTPExpire },
      where: {
        email_role: {
          email,
          role,
        },
      },
    });

    const mailOptions = {
      from: "info@groomzy.co.za",
      to: email,
      subject: "Groomzy password reset request",
      template: "requestResetPassword",
      context: {
        firstName: user.firstName,
        passwordResetOTP,
        headerPartialContext: {
          logoUrl: `${
            process.env.GROOMYZ_API_BASE_URL || ""
          }/common-media-file/media-logo`,
          groomzyUrl: process.env.GROOMZY_BASE_URL || "",
        },
        footerPartialContext: {
          intagramLogoUrl: `${
            process.env.GROOMYZ_API_BASE_URL || ""
          }/common-media-file/instagram-logo`,
          googlePlayLogoUrl: `${
            process.env.GROOMYZ_API_BASE_URL || ""
          }/common-media-file/google-play-button`,
        },
      },
    };

    await transporter.sendMail(mailOptions);

    return {
      message:
        "Requested for password change was successfully, please check your emails for instrunctions.",
    };
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
