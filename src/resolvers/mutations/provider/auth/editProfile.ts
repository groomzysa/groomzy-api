import { GraphQLYogaError } from "@graphql-yoga/node";
import jwt from "jsonwebtoken";

import { IContext } from "../../../types";
import { IEditProfileProviderArgs } from "./types";

export const editProfileProviderMutation = async (
  _: any,
  editProfileProviderInput: IEditProfileProviderArgs,
  ctx: IContext
) => {
  const {
    fullName,
    streetName,
    streetNumber,
    suburbName,
    cityName,
    provinceName,
    areaCode,
    latitude,
    longitude,
  } = editProfileProviderInput;

  const providerToUpdate: Pick<IEditProfileProviderArgs, "fullName"> = {};
  const providerAddressToUpdate: Omit<IEditProfileProviderArgs, "fullName"> =
    {};

  try {
    // Update full name
    if (fullName) {
      providerToUpdate.fullName = fullName;
    }
    // Update street number
    if (streetNumber) {
      providerAddressToUpdate.streetNumber = streetNumber;
    }

    // Update street name
    if (streetName) {
      providerAddressToUpdate.streetName = streetName;
    }

    // Update suburb name
    if (suburbName) {
      providerAddressToUpdate.suburbName = suburbName;
    }

    // Update city name
    if (cityName) {
      providerAddressToUpdate.cityName = cityName;
    }

    // Update province name
    if (provinceName) {
      providerAddressToUpdate.provinceName = provinceName;
    }

    // Update area code
    if (areaCode) {
      providerAddressToUpdate.areaCode = areaCode;
    }

    // Update latitude
    if (latitude) {
      providerAddressToUpdate.latitude = latitude;
    }

    // Update longitude
    if (longitude) {
      providerAddressToUpdate.longitude = longitude;
    }

    // Check if an auth header is set.
    const authorizationHeader =
      ctx.request.headers.get("x-access-token") ||
      ctx.request.headers.get("authorization");

    if (!authorizationHeader) {
      throw new GraphQLYogaError(
        "Looks like you are not signed in. Please sign in."
      );
    }

    // Check if the JWT secret key is defined.
    if (!process.env.GROOMZY_JWT_SECRET) {
      throw new GraphQLYogaError("Internal server error.");
    }

    // Get the token.
    const token = authorizationHeader.split(" ")[1];
    // Verify the token if it is valid.
    const signedIn = jwt.verify(token, process.env.GROOMZY_JWT_SECRET);

    const { id: providerId, role } = signedIn as { id: number; role: string };

    await ctx.prisma.provider.update({
      where: {
        id: providerId,
      },
      data: {
        ...providerToUpdate,
        address: {
          update: {
            ...providerAddressToUpdate,
          },
        },
      },
    });

    return {
      message: "Profile updated successfully",
    };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
