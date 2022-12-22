import { validate } from "isemail";
import { hash } from "bcrypt";
import path from "path";
import hbs from "nodemailer-express-handlebars";
import { getTransporter } from "../../../utils/mail/transporter";
import { IContext } from "../../types";
import { IAddUser } from "./types";
import { GraphQLError } from "graphql";

export const addUser = async (_: any, args: IAddUser, ctx: IContext) => {
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

    const { firstName, lastName, role } = args;

    let { email, password } = args;

    transporter.use(
      "compile",
      hbs({
        viewEngine: {
          layoutsDir: viewPath,
          partialsDir: partialsPath,
          extname: ".handlebars",
          defaultLayout: "signUp",
        },
        viewPath: viewPath,
        extName: ".handlebars",
      })
    );

    // is first name empty
    if (!firstName) {
      throw new GraphQLError("First name is required.");
    }

    // is last name empty
    if (!lastName) {
      throw new GraphQLError("Last name is required.");
    }

    // is email empty
    if (!email || email.length < 1) {
      throw new GraphQLError("Email is required.");
    }

    // is email format correct and conform to the minimum requirement
    if (!validate(email)) {
      throw new GraphQLError("Provided email is invalid.");
    }

    // is password is empty
    if (!password) {
      throw new GraphQLError("Password is required");
    }

    // Password should be at least 5 charectors long.
    if (password.length < 5) {
      throw new GraphQLError("Password must be 5 charectors long.");
    }

    // Tranform email to lower cases and trim the white spaces.
    email = email.toLocaleLowerCase().trim();

    // Check if the user already exists.
    if (
      await ctx.prisma.user.findUnique({
        where: {
          email_role: {
            email,
            role,
          },
        },
      })
    ) {
      throw new GraphQLError(
        "Service provider already exists, navigate to signing in."
      );
    }

    // Hash password before stored in the database.
    password = await hash(password, 10);

    const user = await ctx.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        role,
      },
    });

    const mailOptions = {
      from: "info@groomzy.co.za",
      to: email,
      subject: "Welcome to Groomzy",
      template: "signUp",
      context: {
        firstName: user.firstName,
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

    return user;
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
