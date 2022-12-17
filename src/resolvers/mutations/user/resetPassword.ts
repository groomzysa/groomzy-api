import moment from "moment";
import bcrypt from "bcrypt";
import { IContext } from "../../types";
import { IResetPassword } from "./types";

export const resetPassword = async (
  _: any,
  args: IResetPassword,
  ctx: IContext
) => {
  try {
    const { passwordResetOTP } = args;
    let { password } = args;

    // Check if its a legit one time pin
    // And check if the one time pin is not expired
    const [user] = await ctx.prisma.user.findMany({
      where: {
        passwordResetOTP,
        passwordResetOTPExpire: {
          gte: moment(Date.now()).toDate(),
        },
      },
    });

    if (!user) {
      throw new Error(
        "The OTP is either invalid or expired. \nPlease re-request password change to get new OTP."
      );
    }

    // Hash the new password
    password = await bcrypt.hash(password, 10);
    // Save the new password to the user and remove old one time pin fields
    await ctx.prisma.user.update({
      data: {
        passwordResetOTP: null,
        password,
        passwordResetOTPExpire: null,
      },
      where: {
        email_role: {
          email: user.email,
          role: user.role,
        },
      },
    });

    return { message: "Password changed successfuly!" };
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
