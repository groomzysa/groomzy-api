import { GraphQLYogaError } from "@graphql-yoga/node";
import { Storage } from "@google-cloud/storage";
import fs from "fs";
import path from "path";

import { googleProfilesStorageBucket, tokenAuthUser } from "utils";
import { IContext } from "resolvers/types";
import { IEditProfileArgs } from "./types";

export const editProfileMutation = async (
  _: any,
  editProfileInput: IEditProfileArgs,
  ctx: IContext
) => {
  const { bucket } = googleProfilesStorageBucket();

  const { id, role } = tokenAuthUser(ctx);

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
    profileImage,
  } = editProfileInput;

  const profileToUpdate: { fullName?: string; profileImageUrl?: string } = {};
  const profileAddressToUpdate: Omit<IEditProfileArgs, "fullName"> = {};

  try {
    // Update full name
    if (fullName) {
      profileToUpdate.fullName = fullName;
    }
    // Update street number
    if (streetNumber) {
      profileAddressToUpdate.streetNumber = streetNumber;
    }

    // Update street name
    if (streetName) {
      profileAddressToUpdate.streetName = streetName;
    }

    // Update suburb name
    if (suburbName) {
      profileAddressToUpdate.suburbName = suburbName;
    }

    // Update city name
    if (cityName) {
      profileAddressToUpdate.cityName = cityName;
    }

    // Update province name
    if (provinceName) {
      profileAddressToUpdate.provinceName = provinceName;
    }

    // Update area code
    if (areaCode) {
      profileAddressToUpdate.areaCode = areaCode;
    }

    // Update latitude
    if (latitude) {
      profileAddressToUpdate.latitude = latitude;
    }

    // Update longitude
    if (longitude) {
      profileAddressToUpdate.longitude = longitude;
    }

    // Update profile image
    if (profileImage) {
      const fileStream = await profileImage.stream();
      await fs.promises.writeFile(
        path.join(__dirname, profileImage.name),
        fileStream
      );

      const uploadedImage = await bucket.upload(
        path.join(__dirname, profileImage.name),
        {
          metadata: {
            cacheControl: "max-age=0",
          },
        }
      );

      profileToUpdate.profileImageUrl = uploadedImage[0].publicUrl();

      fs.rmSync(path.join(__dirname, profileImage.name));
    }

    let provider;
    let client;

    if (role === "Provider") {
      provider = await ctx.prisma.provider.update({
        where: {
          id,
        },
        data: {
          ...profileToUpdate,
          address: {
            update: {
              ...profileAddressToUpdate,
            },
          },
        },
      });
    } else {
      client = await ctx.prisma.client.update({
        where: {
          id,
        },
        data: {
          ...profileToUpdate,
          address: {
            update: {
              ...profileAddressToUpdate,
            },
          },
        },
      });
    }

    return {
      message: {
        message: "Profile updated successfully",
      },
      provider,
      client,
    };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
