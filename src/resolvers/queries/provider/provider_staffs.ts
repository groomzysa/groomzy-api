import { GraphQLYogaError } from "@graphql-yoga/node";
import { IContext } from "resolvers/types";

export const providerStaffsQuery = async (
  _: any,
  providerStaffsArgs: { providerId: number },
  ctx: IContext
) => {
  const { providerId } = providerStaffsArgs;
  try {
    return ctx.prisma.provider.findFirst({
      where: {
        id: providerId,
      },
      select: {
        staffs: true,
      },
    });
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
