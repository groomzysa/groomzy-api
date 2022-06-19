import { isEmpty } from "lodash";
import { GraphQLYogaError } from "@graphql-yoga/node";

import { IContext } from "resolvers/types";
import { IProvidersArgs } from "./types";

export const providersQuery = async (
  _: any,
  providersArgs: IProvidersArgs,
  ctx: IContext
) => {
  const { category, search } = providersArgs;
  try {
    if (!isEmpty(search) && !isEmpty(category)) {
      return ctx.prisma.provider.findMany({
        where: {
          serviceProviderCategories: {
            some: {
              AND: [
                {
                  provider: {
                    OR: {
                      fullName: {
                        contains: search,
                        mode: "insensitive",
                      },
                      profile: {
                        tradingName: {
                          contains: search,
                          mode: "insensitive",
                        },
                      },
                    },
                  },
                },
                {
                  category: {
                    category: {
                      equals: category,
                      mode: "insensitive",
                    },
                  },
                },
              ],
            },
          },
        },
        ...providerNormalQuery(),
      });
    } else if (!isEmpty(search)) {
      return ctx.prisma.provider.findMany({
        where: {
          serviceProviderCategories: {
            some: {
              provider: {
                OR: {
                  fullName: {
                    contains: search,
                    mode: "insensitive",
                  },
                  profile: {
                    tradingName: {
                      contains: search,
                      mode: "insensitive",
                    },
                  },
                },
              },
            },
          },
        },
        ...providerNormalQuery(),
      });
    } else if (!isEmpty(category)) {
      return ctx.prisma.provider.findMany({
        where: {
          serviceProviderCategories: {
            some: {
              category: {
                category: {
                  equals: category,
                  mode: "insensitive",
                },
              },
            },
          },
        },
        ...providerNormalQuery(),
      });
    }

    return ctx.prisma.provider.findMany({
      ...providerNormalQuery(),
    });
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};

// A normal providers query
const providerNormalQuery = () => ({
  include: {
    address: true,
    profile: true,
    gallery: true,
    socials: true,
    dayTimes: {
      include: {
        day: true,
        time: true,
      },
    },
    staffs: true,
    bookings: {
      include: {
        client: true,
        rating: true,
        service: true,
        staff: true,
      },
    },
    serviceProviderCategories: {
      select: {
        category: true,
        service: true,
      },
    },
  },
});
