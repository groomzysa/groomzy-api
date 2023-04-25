import { GraphQLError } from "graphql";
import { userAuthToken } from "../../../utils/userAuthToken";
import { IContext } from "../../types";
import { IUpdateGallery } from "./types";
import moment from "moment";
import { storeUpload } from "../../../utils/fileStore";

export const updateGallery = async (
  _: any,
  args: IUpdateGallery,
  ctx: IContext
) => {
  const tokenDetails = userAuthToken(ctx);

  if (!tokenDetails) {
    throw new GraphQLError("Unauthorised!");
  }

  try {
    const { id: userId } = tokenDetails;
    const { galleryId, name, galleryImage } = args;
    const updateData: Omit<IUpdateGallery, "galleryId"> = {};

    // update gallery image name
    if (name) {
      updateData.name = name;
    }

    // update gallery image
    if (galleryImage) {
      const filename = `${userId}-${moment(new Date()).utc()}-gallery.${
        galleryImage.type.split("/")[1]
      }`;
      const filePath = `${process.env.GROOMZY_IMAGES_BASE_PATH}/gallery`;

      const buffer = await galleryImage.arrayBuffer();

      updateData.galleryurl = await storeUpload({
        buffer,
        filename,
        filePath,
        getFileEndpoint: "gallery",
      });
    }

    return ctx.prisma.gallery.update({
      where: {
        id: galleryId,
      },
      data: {
        ...updateData,
      },
    });
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
