import { GraphQLYogaError } from "@graphql-yoga/node";
import { Storage } from "@google-cloud/storage";
import fs from "fs";
import path from "path";

import { googleProfilesStorageBucket, tokenAuthUser } from "utils";
import { IContext } from "resolvers/types";
import { IAddProfileArgs } from "./types";

export const addProviderProfileMutation = async (
  _: any,
  addProfileInput: IAddProfileArgs,
  ctx: IContext
) => {
  const { bucket } = googleProfilesStorageBucket();

  const { id } = tokenAuthUser(ctx);
  const {
    tradingName,
    tradingStreetNumber,
    tradingStreetName,
    tradingSuburbName,
    tradingCityName,
    tradingProvinceName,
    tradingAreaCode,
    tradingProfileImage,
  } = addProfileInput;

  let profileImageUrl: string;

  try {
    // Trading name is required
    if (!tradingName) {
      throw new GraphQLYogaError("Trading name is required.");
    }

    // Trading street number is required
    if (!tradingStreetNumber) {
      throw new GraphQLYogaError("Trading street number is required.");
    }

    // Trading street name is required
    if (!tradingStreetName) {
      throw new GraphQLYogaError("Trading street name is required.");
    }

    // Trading suburb name is required
    if (!tradingSuburbName) {
      throw new GraphQLYogaError("Trading suburb name is required.");
    }

    // Trading city name is required
    if (!tradingCityName) {
      throw new GraphQLYogaError("Trading city name is required.");
    }

    // Trading province name is required
    if (!tradingProvinceName) {
      throw new GraphQLYogaError("Trading province name is required.");
    }

    // Trading area code is required
    if (!tradingAreaCode) {
      throw new GraphQLYogaError("Trading area code is required.");
    }

    // Check if the JWT secret key is defined.
    if (!process.env.GROOMZY_JWT_SECRET) {
      throw new GraphQLYogaError("Internal server error.");
    }

    // Update profile image
    if (tradingProfileImage) {
      const fileStream = await tradingProfileImage.stream();
      await fs.promises.writeFile(
        path.join(__dirname, tradingProfileImage.name),
        fileStream
      );

      const uploadedImage = await bucket.upload(
        path.join(__dirname, tradingProfileImage.name),
        {
          metadata: {
            cacheControl: "max-age=0",
          },
        }
      );

      profileImageUrl = uploadedImage[0].publicUrl();

      fs.rmSync(path.join(__dirname, tradingProfileImage.name));
    }

    delete addProfileInput.tradingProfileImage;

    if (profileImageUrl) {
      addProfileInput.tradingProfileImageUrl = profileImageUrl;
    }

    const profile = await ctx.prisma.providerProfile.upsert({
      where: {
        providerId: id,
      },
      update: addProfileInput,
      create: {
        ...addProfileInput,
        provider: {
          connect: {
            id,
          },
        },
      },
    });

    return {
      message: {
        message: "Profile added successfully",
      },
      profile,
    };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
