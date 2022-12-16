import { GraphQLError } from "graphql";
import { userAuthToken } from "../../../utils/userAuthToken";
import { IContext } from "../../types";
import { IUpdateAccountAddress } from "./types";

export const updateAccountAddress = async (
  _: any,
  args: IUpdateAccountAddress,
  ctx: IContext
) => {
  const tokenDetails = userAuthToken(ctx);

  if (!tokenDetails) {
    throw new GraphQLError("Unauthorised!");
  }

  try {
    const {
      addressId,
      streetName,
      streetNumber,
      town,
      city,
      province,
      areaCode,
    } = args;

    const updateData: Omit<IUpdateAccountAddress, "addressId"> = {};

    // update street number
    if (streetNumber) {
      updateData.streetNumber = streetNumber;
    }

    // update street name
    if (streetName) {
      updateData.streetName = streetName;
    }

    // update town / suburb name
    if (town) {
      updateData.town = town;
    }

    // update city name
    if (city) {
      updateData.city = city;
    }

    // update province name
    if (province) {
      updateData.province = province;
    }

    // update area code
    if (areaCode) {
      updateData.areaCode = areaCode;
    }

    return await ctx.prisma.address.update({
      where: {
        id: addressId,
      },
      data: {
        ...updateData,
      },
    });
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
