import { GraphQLError } from "graphql";
import { IContext } from "../../types";
import { IOperatingTime } from "./types";

export const operatingTime = async (
  _: any,
  args: IOperatingTime,
  ctx: IContext
) => {
  try {
    const { operatingTimeId } = args;

    if (!operatingTimeId) {
      throw new GraphQLError("Perating time id is required.");
    }

    return ctx.prisma.operatingTime.findUnique({
      where: {
        id: operatingTimeId,
      },
    });
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
