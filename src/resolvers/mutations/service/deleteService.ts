import { GraphQLError } from "graphql";
import { userAuthToken } from "../../../utils/userAuthToken";
import { IContext } from "../../types";
import { IDeleteService } from "./types";

export const deleteService = async (
  _: any,
  args: IDeleteService,
  ctx: IContext
) => {
  const tokenDetails = userAuthToken(ctx);

  if (!tokenDetails) {
    throw new GraphQLError("Unauthorised!");
  }

  try {
    const { serviceId } = args;

    return await ctx.prisma.service.delete({
      where: {
        id: serviceId,
      },
    });
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
