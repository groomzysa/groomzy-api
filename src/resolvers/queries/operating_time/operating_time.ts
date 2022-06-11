import { GraphQLYogaError } from "@graphql-yoga/node";
import { IContext } from "resolvers/types";

import { IOperatingTimeArgs } from "./types";

export const operatingTimeQuery = async (
  _: any,
  operatingTimeArgs: IOperatingTimeArgs,
  ctx: IContext
) => {
  const { id } = operatingTimeArgs;
  try {
    return ctx.prisma.dayTime.findFirst({
      where: {
        id,
      },
      include: {
        day: true,
        time: true,
      },
    });
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
