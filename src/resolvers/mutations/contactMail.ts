import { GraphQLError } from "graphql";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import { getTransporter } from "../../utils/mail/transporter";
import { IContext } from "../types";
import { IContactMail } from "./types";

export const contactMail = async (
  _: any,
  args: IContactMail,
  ctx: IContext
) => {
  try {
    const pathToViews = "../../utils/mail/views";
    const pathToPartials = "../../utils/mail/partials";
    const transporter = getTransporter({
      host: process.env.GROOMZY_HOST || "",
      user: process.env.GROOMZY_USER || "",
      pass: process.env.GROOMZY_PASS || "",
    });
    const viewPath = path.resolve(__dirname, pathToViews);
    const partialsPath = path.resolve(__dirname, pathToPartials);
    const { email, subject, message, firstName, lastName } = args;

    transporter.use(
      "compile",
      hbs({
        viewEngine: {
          layoutsDir: viewPath,
          partialsDir: partialsPath,
          extname: ".handlebars",
          defaultLayout: "contact",
        },
        viewPath: viewPath,
        extName: ".handlebars",
      })
    );

    const mailOptions = {
      from: email,
      to: "info@groomzy.co.za",
      subject,
      template: "contact",
      context: {
        subject,
        firstName,
        lastName,
        message,
        headerPartialContext: {
          logoUrl: `${
            process.env.GROOMYZ_API_BASE_URL || ""
          }/common-media-file/:media-logo`,
          groomzyUrl: process.env.GROOMZY_BASE_URL || "",
        },
        footerPartialContext: {
          intagramLogoUrl: `${
            process.env.GROOMYZ_API_BASE_URL || ""
          }/common-media-file/:instagram-logo`,
          googlePlayLogoUrl: `${
            process.env.GROOMYZ_API_BASE_URL || ""
          }/common-media-file/:google-play-button`,
        },
      },
    };

    await transporter.sendMail(mailOptions);

    return {
      message: "Email sent successfuly.",
    };
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
