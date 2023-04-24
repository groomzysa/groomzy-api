import { GraphQLError } from "graphql";
import { userAuthToken } from "../../../utils/userAuthToken";
import { IContext } from "../../types";
import { IUpdateTradingInfo } from "./types";
import { storeUpload } from "../../../utils/fileStore";

export const updateTradingInfo = async (
  _: any,
  args: IUpdateTradingInfo,
  ctx: IContext
) => {
  const tokenDetails = userAuthToken(ctx);

  if (!tokenDetails) {
    throw new GraphQLError("Unauthorised!");
  }

  const { id } = tokenDetails;

  try {
    const { providerId, tradingName, phone, logo } = args;

    const updateData: Omit<IUpdateTradingInfo, "providerId" | "logo"> = {};

    if (logo) {
      const filename = `${id}-logo.${logo.type.split("/")[1]}`;
      const filePath = `${process.env.GROOMZY_IMAGES_BASE_PATH}/logo`;

      const buffer = await logo.arrayBuffer();

      updateData.logoUrl = await storeUpload({
        buffer,
        filename,
        filePath,
        getFileEndpoint: "logo",
      });
    }

    // update trading name
    if (tradingName) {
      updateData.tradingName = tradingName;
    }

    // update phone
    if (phone) {
      updateData.phone = phone;
    }

    return await ctx.prisma.provider.update({
      where: {
        id: providerId,
      },
      data: {
        ...updateData,
      },
    });
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
