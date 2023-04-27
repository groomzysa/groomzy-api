import { IContext } from "../../types";
import { IAddGallery } from "./types";
import { GraphQLError } from "graphql";
import { userAuthToken } from "../../../utils/userAuthToken";
import { storeUpload } from "../../../utils/fileStore";
import moment from "moment";

export const addGallery = async (_: any, args: IAddGallery, ctx: IContext) => {
  try {
    const { name, galleryImage } = args;
    const tokenDetails = userAuthToken(ctx);

    if (!tokenDetails) return;

    const { id: userId } = tokenDetails;

    // is gallery image name empty
    if (!name) {
      throw new GraphQLError("Gallery image name is required.");
    }

    // is gallery image empty
    if (!galleryImage) {
      throw new GraphQLError("Gallery image is required.");
    }

    let galleryImageUrl;

    const filename = `${userId}-${name}-gallery.${
      galleryImage.type.split("/")[1]
    }`;
    const filePath = `${process.env.GROOMZY_IMAGES_BASE_PATH}/gallery`;

    const buffer = await galleryImage.arrayBuffer();

    galleryImageUrl = await storeUpload({
      buffer,
      filename,
      filePath,
      getFileEndpoint: "gallery",
    });

    if (!galleryImageUrl) {
      throw new GraphQLError(
        "Something went wrong while storing gallery image."
      );
    }

    return ctx.prisma.gallery.create({
      data: {
        name,
        galleryImageUrl,
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
