import { GraphQLError } from "graphql";
import { userAuthToken } from "../../../utils/userAuthToken";
import { IContext } from "../../types";
import { IAddTradingAddress } from "./types";

export const addTradingAddress = async (
  _: any,
  args: IAddTradingAddress,
  ctx: IContext
) => {
  const tokenDetails = userAuthToken(ctx);

  if (!tokenDetails) {
    throw new GraphQLError("Unauthorised!");
  }

  const { id: userId } = tokenDetails;

  try {
    const { streetName, streetNumber, town, city, province, areaCode } = args;

    // is street number empty
    if (!streetNumber) {
      throw new GraphQLError("Street number is required.");
    }

    // is street name empty
    if (!streetName) {
      throw new GraphQLError("Street name is required.");
    }

    // is town empty
    if (!town) {
      throw new GraphQLError("Town name is required.");
    }

    // is city name empty
    if (!city) {
      throw new GraphQLError("City name is required.");
    }

    // is province name empty
    if (!province) {
      throw new GraphQLError("Province name is required.");
    }

    // is area code empty
    if (!areaCode) {
      throw new GraphQLError("Area code is required.");
    }

    return await ctx.prisma.address.create({
      data: {
        streetName,
        streetNumber,
        town,
        city,
        province,
        areaCode,
        provider: {
          connect: {
            userId,
          },
        },
      },
    });
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
