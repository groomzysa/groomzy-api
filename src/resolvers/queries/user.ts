import { userAuthToken } from "../../utils/userAuthToken";
import { IContext } from "../types";

export const user = async (_: any, __: any, ctx: IContext) => {
  const tokenDetails = userAuthToken(ctx);

  if (!tokenDetails) return;

  const { id } = tokenDetails;

  try {
    return ctx.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        address: true,
        provider: {
          include: {
            addresses: true,
          },
        },
      },
    });
  } catch (error) {
    return;
  }
};
