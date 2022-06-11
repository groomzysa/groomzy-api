import { IContext } from "./types";
import { signupClientMutation } from "./mutations/client/auth/signup";
import {
  IClientBookArgs,
  IClientCancelBookingArgs,
  IClientCompleteBookingArgs,
  IClientDeleteBookingArgs,
  IClientRateBookingArgs,
} from "../resolvers/mutations/client/booking/types";
import {
  ISigninClientArgs,
  ISignupClientArgs,
} from "../resolvers/mutations/client/auth/types";
import { ISignupProviderArgs } from "./mutations/provider/auth/types";
import {
  IProviderCancelBookingArgs,
  IProviderDoneBookingArgs,
} from "./mutations/provider/booking/types";
import { signupProviderMutation } from "./mutations/provider/auth/signup";
import { signinClientMutation } from "./mutations/client/auth/signin";
import { ISignInProviderArgs } from "./mutations/provider/auth/types";
import { signinProviderMutation } from "./mutations/provider/auth/signin";
import { addServiceMutation } from "./mutations/provider/service/add_service";
import { IAddServiceArgs } from "./mutations/provider/service/types";
import { addStaffMutation } from "./mutations/provider/staff/add_staff";
import { IAddStaffArgs } from "./mutations/provider/staff/types";
import { IDeleteServiceArgs } from "./mutations/provider/service/types";
import { deleteServiceMutation } from "./mutations/provider/service/delete_service";
import { IDeleteStaffArgs } from "./mutations/provider/staff/types";
import { deleteStaffMutation } from "./mutations/provider/staff/delete_staff";
import { editServiceMutation } from "./mutations/provider/service/edit_service";
import { IEditServiceArgs } from "./mutations/provider/service/types";
import { IEditStaffArgs } from "./mutations/provider/staff/types";
import { editStaffMutation } from "./mutations/provider/staff/edit_staff";
import { addOperatingTimeMutation } from "./mutations/provider/operating_time/add_operating_time";
import {
  IAddOperatingTimeArgs,
  IDeleteOperatingTimeArgs,
  IEditOperatingTimeArgs,
} from "./mutations/provider/operating_time/types";
import { editOperatingTimeMutation } from "./mutations/provider/operating_time/edit_operating_time";
import { deleteOperatingTimeMutation } from "./mutations/provider/operating_time/delete_operating_time";
import { clientBookMutation } from "./mutations/client/booking/book";
import { clientBookingCompleteMutation } from "./mutations/client/booking/booking_complete";
import { clientBookingCancelMutation } from "./mutations/client/booking/booking_cancel";
import { clientBookingDeleteMutation } from "./mutations/client/booking/booking_delete";
import { editProfileMutation } from "./mutations/edit_profile";
import { providerBookingDoneMutation } from "./mutations/provider/booking/booking_done";
import { providerBookingCancelMutation } from "./mutations/provider/booking/booking_cancel";
import { clientBookingRateMutation } from "./mutations/client/booking/booking_rate";
import { IEditProfileArgs, ISendMailArgs } from "./mutations/types";
import { sendMailMutation } from "./mutations/send_mail";
import { addProviderProfileMutation } from "./mutations/provider/profile/add_profile";
import { IAddProfileArgs } from "./mutations/provider/profile/types";
import { addSocialMutation } from "./mutations/provider/social/add_social";
import {
  IAddSocialArgs,
  IDeleteSocialArgs,
  IEditSocialArgs,
} from "./mutations/provider/social/types";
import { editSocialMutation } from "./mutations/provider/social/edit_social";
import { deleteSocialMutation } from "./mutations/provider/social/delete_social";
import { addGalleryMutation } from "./mutations/provider/gallery/add_gallery";
import {
  IAddGalleryArgs,
  IDeleteGalleryArgs,
} from "./mutations/provider/gallery/types";
import { deleteGalleryMutation } from "./mutations/provider/gallery/delete_gallery";

export default {
  /**
   * Client sign up mutation
   */
  signupClient: async (
    _: any,
    signUpClientsArgs: ISignupClientArgs,
    ctx: IContext
  ) => {
    return signupClientMutation(_, signUpClientsArgs, ctx);
  },
  /**
   * Client sign in mutation
   */
  signinClient: async (
    _: any,
    signInClientArgs: ISigninClientArgs,
    ctx: IContext
  ) => {
    return signinClientMutation(_, signInClientArgs, ctx);
  },

  /**
   * Provider sign up mutation
   */
  signupProvider: async (
    _: any,
    signUpProviderArgs: ISignupProviderArgs,
    ctx: IContext
  ) => {
    return signupProviderMutation(_, signUpProviderArgs, ctx);
  },

  /**
   * Edit profile mutation
   */
  editProfile: async (
    _: any,
    editProfileArgs: IEditProfileArgs,
    ctx: IContext
  ) => {
    return editProfileMutation(_, editProfileArgs, ctx);
  },

  /**
   * Provider sign up mutation
   */
  signinProvider: async (
    _: any,
    signInProviderArgs: ISignInProviderArgs,
    ctx: IContext
  ) => {
    return signinProviderMutation(_, signInProviderArgs, ctx);
  },

  /**
   * Add service mutation
   */
  addService: async (
    _: any,
    addServiceArgs: IAddServiceArgs,
    ctx: IContext
  ) => {
    return addServiceMutation(_, addServiceArgs, ctx);
  },

  /**
   * Delete service mutation
   */
  deleteService: async (
    _: any,
    deleteServiceArgs: IDeleteServiceArgs,
    ctx: IContext
  ) => {
    return deleteServiceMutation(_, deleteServiceArgs, ctx);
  },

  /**
   * Edit service mutation
   */
  editService: async (
    _: any,
    editServiceArgs: IEditServiceArgs,
    ctx: IContext
  ) => {
    return editServiceMutation(_, editServiceArgs, ctx);
  },

  /**
   * Add staff mutation
   */
  addStaff: async (_: any, addStaffArgs: IAddStaffArgs, ctx: IContext) => {
    return addStaffMutation(_, addStaffArgs, ctx);
  },

  /**
   * Delete staff mutation
   */
  deleteStaff: async (
    _: any,
    deleteStaffArgs: IDeleteStaffArgs,
    ctx: IContext
  ) => {
    return deleteStaffMutation(_, deleteStaffArgs, ctx);
  },

  /**
   * Edit staff mutation
   */
  editStaff: async (_: any, editStaffArgs: IEditStaffArgs, ctx: IContext) => {
    return editStaffMutation(_, editStaffArgs, ctx);
  },

  /**
   * Add operating time mutation
   */
  addOperatingTime: async (
    _: any,
    addOperatingTimeArgs: IAddOperatingTimeArgs,
    ctx: IContext
  ) => {
    return addOperatingTimeMutation(_, addOperatingTimeArgs, ctx);
  },

  /**
   * Edit operating time mutation
   */
  editOperatingTime: async (
    _: any,
    editOperatingTimeArgs: IEditOperatingTimeArgs,
    ctx: IContext
  ) => {
    return editOperatingTimeMutation(_, editOperatingTimeArgs, ctx);
  },

  /**
   * Delete operating time mutation
   */
  deleteOperatingTime: async (
    _: any,
    deleteOperatingTimeArgs: IDeleteOperatingTimeArgs,
    ctx: IContext
  ) => {
    return deleteOperatingTimeMutation(_, deleteOperatingTimeArgs, ctx);
  },

  /**
   * Add social mutation
   */
  addSocial: async (_: any, addSocialArgs: IAddSocialArgs, ctx: IContext) => {
    return addSocialMutation(_, addSocialArgs, ctx);
  },

  /**
   * Edit social mutation
   */
  editSocial: async (
    _: any,
    editSocialArgs: IEditSocialArgs,
    ctx: IContext
  ) => {
    return editSocialMutation(_, editSocialArgs, ctx);
  },

  /**
   * Delete social mutation
   */
  deleteSocial: async (
    _: any,
    deleteSocialArgs: IDeleteSocialArgs,
    ctx: IContext
  ) => {
    return deleteSocialMutation(_, deleteSocialArgs, ctx);
  },

  /**
   * Add gallery mutation
   */
  addGallery: async (
    _: any,
    addGalleryArgs: IAddGalleryArgs,
    ctx: IContext
  ) => {
    return addGalleryMutation(_, addGalleryArgs, ctx);
  },

  /**
   * Delete gallery mutation
   */
  deleteGallery: async (
    _: any,
    deleteGalleryArgs: IDeleteGalleryArgs,
    ctx: IContext
  ) => {
    return deleteGalleryMutation(_, deleteGalleryArgs, ctx);
  },

  /**
   * Add provider profile mutation
   */
  addProviderProfile: async (
    _: any,
    addProfileArgs: IAddProfileArgs,
    ctx: IContext
  ) => {
    return addProviderProfileMutation(_, addProfileArgs, ctx);
  },

  /**
   * Provider done booking mutation
   */
  providerBookingDone: async (
    _: any,
    providerDoneBookingArgs: IProviderDoneBookingArgs,
    ctx: IContext
  ) => {
    return providerBookingDoneMutation(_, providerDoneBookingArgs, ctx);
  },

  /**
   * Provider cancel booking mutation
   */
  providerBookingCancel: async (
    _: any,
    providerCancelBookingArgs: IProviderCancelBookingArgs,
    ctx: IContext
  ) => {
    return providerBookingCancelMutation(_, providerCancelBookingArgs, ctx);
  },

  /**
   * Client book mutation
   */
  clientBook: async (
    _: any,
    clientBookArgs: IClientBookArgs,
    ctx: IContext
  ) => {
    return clientBookMutation(_, clientBookArgs, ctx);
  },

  /**
   * Client booking complete mutation
   */
  clientBookingComplete: async (
    _: any,
    clientCompleteBookingArgs: IClientCompleteBookingArgs,
    ctx: IContext
  ) => {
    return clientBookingCompleteMutation(_, clientCompleteBookingArgs, ctx);
  },

  /**
   * Client booking cancel mutation
   */
  clientBookingCancel: async (
    _: any,
    clientCancelBookingArgs: IClientCancelBookingArgs,
    ctx: IContext
  ) => {
    return clientBookingCancelMutation(_, clientCancelBookingArgs, ctx);
  },

  /**
   * Client booking delete mutation
   */
  clientBookingDelete: async (
    _: any,
    clientDeleteBooingkArgs: IClientDeleteBookingArgs,
    ctx: IContext
  ) => {
    return clientBookingDeleteMutation(_, clientDeleteBooingkArgs, ctx);
  },

  /**
   * Client booking rate mutation
   */
  clientBookingRate: async (
    _: any,
    clientRateBooingkArgs: IClientRateBookingArgs,
    ctx: IContext
  ) => {
    return clientBookingRateMutation(_, clientRateBooingkArgs, ctx);
  },

  /**
   *
   * Send mail mutation
   *
   */
  sendMail: async (_: any, sendEmailArgs: ISendMailArgs, __: any) =>
    sendMailMutation(_, sendEmailArgs, __),
};
