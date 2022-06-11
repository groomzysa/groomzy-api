import { GraphQLYogaError } from "@graphql-yoga/node";
import { Category, ServiceProviderCategory } from "@prisma/client";

import { tokenAuthUser } from "utils";
import { IContext } from "resolvers/types";
import { IEditServiceArgs } from "./types";

export const editServiceMutation = async (
  _: any,
  editServiceInput: IEditServiceArgs,
  ctx: IContext
) => {
  const { id: providerId } = tokenAuthUser(ctx);
  const {
    serviceId,
    title,
    category,
    price,
    description,
    duration,
    durationUnit,
    inHouse,
  } = editServiceInput;

  const serviceToUpdate: Omit<IEditServiceArgs, "serviceId"> = {};

  try {
    // Update title
    if (title) {
      serviceToUpdate.title = title;
    }

    // Update category
    let newServiceCategory: Category;
    let oldServiceCategory: ServiceProviderCategory;
    if (category) {
      [newServiceCategory, oldServiceCategory] = await Promise.all([
        ctx.prisma.category.findFirst({
          where: {
            category: category,
          },
        }),
        ctx.prisma.serviceProviderCategory.findFirst({
          where: {
            serviceId,
          },
        }),
      ]);
    }

    // Update price
    if (price) {
      serviceToUpdate.price = price;
    }

    // Update description
    if (description) {
      serviceToUpdate.description = description;
    }

    // Update duration
    if (duration) {
      serviceToUpdate.duration = duration;
    }

    // Update duration unit
    if (durationUnit) {
      serviceToUpdate.durationUnit = durationUnit;
    }

    // Update in house call
    serviceToUpdate.inHouse = inHouse ?? false;

    let service;
    if (!newServiceCategory) {
      service = await ctx.prisma.service.update({
        where: {
          id: serviceId,
        },
        data: {
          ...serviceToUpdate,
        },
        include: {
          serviceProviderCategories: {
            include: {
              category: true,
            },
          },
        },
      });
    } else {
      await ctx.prisma.serviceProviderCategory.update({
        where: {
          categoryId_serviceId_providerId: {
            categoryId: oldServiceCategory.categoryId,
            providerId,
            serviceId,
          },
        },
        data: {
          categoryId: newServiceCategory.id,
        },
      });

      service = await ctx.prisma.service.update({
        where: {
          id: serviceId,
        },
        data: {
          ...serviceToUpdate,
        },
        include: {
          serviceProviderCategories: {
            include: {
              category: true,
            },
          },
        },
      });
    }

    return {
      message: {
        message: "Service updated successfully",
      },
      service,
    };
  } catch (error) {
    throw new GraphQLYogaError(error.message);
  }
};
