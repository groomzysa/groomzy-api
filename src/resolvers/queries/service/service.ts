import { GraphQLError } from "graphql";
import { IContext } from "../../types";
import { IService } from "./types";

export const service = async (_: any, args: IService, ctx: IContext) => {
  try {
    const { serviceId } = args;

    if (!serviceId) {
      throw new GraphQLError("Service id is required.");
    }

    return ctx.prisma.service.findUnique({
      where: {
        id: serviceId,
      },
    });
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
