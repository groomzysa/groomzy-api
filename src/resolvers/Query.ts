import { IContext } from "./types";
import { clientsQuery } from "./queries/client/clients";
import { providersQuery } from "./queries/provider/providers";
import { providerRatingsQuery } from "./queries/provider/proider_ratings";
import { providerBookingsQuery } from "./queries/provider/provider_bookings";
import { providerServicesQuery } from "./queries/provider/provider_services";
import { providerStaffsQuery } from "./queries/provider/provider_staffs";
import { providerOperatingTimesQuery } from "./queries/provider/provider_operating_times";
import { clientBookingsQuery } from "./queries/client/client_bookings";
import {
  IProviderGalleryArgs,
  IProvidersArgs,
  IProviderSocialsArgs,
} from "./queries/provider/types";
import { clientQuery } from "./queries/client/client";
import { providerQuery } from "./queries/provider/provider";
import { IServiceArgs } from "./queries/service/types";
import { serviceQuery } from "./queries/service/service";
import { operatingTimeQuery } from "./queries/operating_time/operating_time";
import { IOperatingTimeArgs } from "./queries/operating_time/types";
import { staffQuery } from "./queries/staff/staff";
import { IStaffArgs } from "./queries/staff/types";
import { providerProfileQuery } from "./queries/provider/provider_profile";
import { IProviderProfileArgs } from "./queries/provider/types";
import { providerSocialsQuery } from "./queries/provider/provider_socials";
import { ISocialArgs } from "./queries/social/types";
import { socialQuery } from "./queries/social/social";
import { galleryQuery } from "./queries/gallery/gallery";
import { IGalleryArgs } from "./queries/gallery/types";
import { providerGalleryQuery } from "./queries/provider/provider_gallery";

export default {
  /**
   * Get client
   *
   * @param _
   * @param __
   * @param ctx
   * @returns
   */
  client: async (_: any, __: any, ctx: IContext) => clientQuery(_, __, ctx),
  /**
   * Get all clients
   * @param _
   * @param __
   * @param ctx
   * @returns [Client]
   */
  clients: async (_: any, __: any, ctx: IContext) => clientsQuery(_, __, ctx),

  /**
   * Get all client bookings
   * @param _
   * @param clientBookingArgs
   * @param ctx
   * @returns [Client]
   */
  clientBookings: async (
    _: any,
    clientBookingArgs: { clientId: number },
    ctx: IContext
  ) => clientBookingsQuery(_, clientBookingArgs, ctx),

  /**
   *
   * @param _
   * @param __
   * @param ctx
   * @returns
   */
  provider: async (_: any, __: any, ctx: IContext) => providerQuery(_, __, ctx),

  /**
   * Get all service providers
   * @param _
   * @param providersArgs
   * @param ctx
   * @returns [Privider]
   */
  providers: async (_: any, providersArgs: IProvidersArgs, ctx: IContext) =>
    providersQuery(_, providersArgs, ctx),

  /**
   * Get all provider services
   * @param _
   * @param providerOperatingTimeArgs
   * @param ctx
   * @returns [Privider]
   */
  providerOperatingTimes: async (
    _: any,
    providerOperatingTimeArgs: { providerId: number },
    ctx: IContext
  ) => providerOperatingTimesQuery(_, providerOperatingTimeArgs, ctx),

  /**
   * Get all provider services
   * @param _
   * @param providerServicesArgs
   * @param ctx
   * @returns [Privider]
   */
  providerServices: async (
    _: any,
    providerServicesArgs: { providerId: number },
    ctx: IContext
  ) => providerServicesQuery(_, providerServicesArgs, ctx),

  /**
   * Get all provider bookings
   * @param _
   * @param providerBookingArgs
   * @param ctx
   * @returns [Privider]
   */
  providerBookings: async (
    _: any,
    providerBookingArgs: { providerId: number },
    ctx: IContext
  ) => providerBookingsQuery(_, providerBookingArgs, ctx),

  /**
   * Get all provider staffs
   * @param _
   * @param providerStaffArgs
   * @param ctx
   * @returns [Privider]
   */
  providerStaffs: async (
    _: any,
    providerStaffArgs: { providerId: number },
    ctx: IContext
  ) => providerStaffsQuery(_, providerStaffArgs, ctx),

  /**
   * Get all provider ratings
   * @param _
   * @param providerRatingArgs
   * @param ctx
   * @returns [Privider]
   */
  providerRatings: async (
    _: any,
    providerRatingArgs: { providerId: number },
    ctx: IContext
  ) => providerRatingsQuery(_, providerRatingArgs, ctx),

  /**
   * Get all provider socials
   * @param _
   * @param providerSocialsArgs
   * @param ctx
   * @returns [Privider]
   */
  providerSocials: async (
    _: any,
    providerSocialsArgs: IProviderSocialsArgs,
    ctx: IContext
  ) => providerSocialsQuery(_, providerSocialsArgs, ctx),

  /**
   * Get all provider gallery
   * @param _
   * @param providerGalleryArgs
   * @param ctx
   * @returns [Privider]
   */
  providerGallery: async (
    _: any,
    providerGalleryArgs: IProviderGalleryArgs,
    ctx: IContext
  ) => providerGalleryQuery(_, providerGalleryArgs, ctx),

  /**
   *
   * @param _
   * @param serviceArgs
   * @param ctx
   * @returns
   */
  service: async (_: any, serviceArgs: IServiceArgs, ctx: IContext) =>
    serviceQuery(_, serviceArgs, ctx),

  /**
   *
   * @param _
   * @param operatingTimeArgs
   * @param ctx
   * @returns
   */
  operatingTime: async (
    _: any,
    operatingTimeArgs: IOperatingTimeArgs,
    ctx: IContext
  ) => operatingTimeQuery(_, operatingTimeArgs, ctx),

  /**
   *
   * @param _
   * @param staffArgs
   * @param ctx
   * @returns
   */
  staff: async (_: any, staffArgs: IStaffArgs, ctx: IContext) =>
    staffQuery(_, staffArgs, ctx),

  /**
   *
   * @param _
   * @param providerProfileArgs
   * @param ctx
   * @returns
   */
  providerProfile: async (
    _: any,
    providerProfileArgs: IProviderProfileArgs,
    ctx: IContext
  ) => providerProfileQuery(_, providerProfileArgs, ctx),

  /**
   *
   * @param _
   * @param socialArgs
   * @param ctx
   * @returns
   */
  social: async (_: any, socialArgs: ISocialArgs, ctx: IContext) =>
    socialQuery(_, socialArgs, ctx),

  /**
   *
   * @param _
   * @param galleryArgs
   * @param ctx
   * @returns
   */
  gallery: async (_: any, galleryArgs: IGalleryArgs, ctx: IContext) =>
    galleryQuery(_, galleryArgs, ctx),
};
