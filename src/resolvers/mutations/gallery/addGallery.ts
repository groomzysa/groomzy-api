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

    let galleryImageurl;

    if (galleryImage) {
      const filename = `${userId}-${moment(new Date()).utc()}-gallery.${
        galleryImage.type.split("/")[1]
      }`;
      const filePath = `${process.env.GROOMZY_IMAGES_BASE_PATH}/gallery`;

      const buffer = await galleryImage.arrayBuffer();

      galleryImageurl = await storeUpload({
        buffer,
        filename,
        filePath,
        getFileEndpoint: "gallery",
      });
    }

    if (!galleryImageurl) {
      throw new GraphQLError(
        "Something went wrong while storing gallery image."
      );
    }

    return ctx.prisma.gallery.create({
      data: {
        name,
        galleryurl: galleryImageurl,
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
