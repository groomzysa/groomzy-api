import { GraphQLError } from "graphql";
import { userAuthToken } from "../../../utils/userAuthToken";
import { IContext } from "../../types";
import { IAddTradingInfo } from "./types";
import { storeUpload } from "../../../utils/fileStore";

export const addTradingInfo = async (
  _: any,
  args: IAddTradingInfo,
  ctx: IContext
) => {
  const tokenDetails = userAuthToken(ctx);

  if (!tokenDetails) {
    throw new GraphQLError("Unauthorised!");
  }

  const { id } = tokenDetails;

  try {
    const { tradingName, phone, logo } = args;
    let logoUrl;

    if (logo) {
      const filename = `${id}-logo.${logo.type.split("/")[1]}`;
      const filePath = `${process.env.GROOMZY_IMAGES_BASE_PATH}/logo`;

      const buffer = await logo.arrayBuffer();

      logoUrl = await storeUpload({
        buffer,
        filename,
        filePath,
        getFileEndpoint: "logo",
      });
    }

    // is trading name empty
    if (!tradingName) {
      throw new GraphQLError("Trading name is required.");
    }

    // is phone name empty
    if (!phone) {
      throw new GraphQLError("Contact phone number is required.");
    }

    return await ctx.prisma.provider.create({
      data: {
        tradingName,
        phone,
        logoUrl,
        user: {
          connect: {
            id,
          },
        },
      },
    });
  } catch (error) {
    throw new GraphQLError((error as Error).message);
  }
};
