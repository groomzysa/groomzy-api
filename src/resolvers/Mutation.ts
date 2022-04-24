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
import {
  IEditProfileProviderArgs,
  ISignupProviderArgs,
} from "./mutations/provider/auth/types";
import {
  IProviderCancelBookingArgs,
  IProviderDoneBookingArgs,
} from "./mutations/provider/booking/types";
import { signupProviderMutation } from "./mutations/provider/auth/signup";
import { signinClientMutation } from "./mutations/client/auth/signin";
import { ISignInProviderArgs } from "./mutations/provider/auth/types";
import { signinProviderMutation } from "./mutations/provider/auth/signin";
import { addServiceMutation } from "./mutations/provider/service/addServices";
import { IAddServiceArgs } from "./mutations/provider/service/types";
import { addStaffMutation } from "./mutations/provider/staff/addStaff";
import { IAddStaffArgs } from "./mutations/provider/staff/types";
import { IDeleteServiceArgs } from "./mutations/provider/service/types";
import { deleteServiceMutation } from "./mutations/provider/service/deleteService";
import { IDeleteStaffArgs } from "./mutations/provider/staff/types";
import { deleteStaffMutation } from "./mutations/provider/staff/deleteStaff";
import { editServiceMutation } from "./mutations/provider/service/editService";
import { IEditServiceArgs } from "./mutations/provider/service/types";
import { IEditStaffArgs } from "./mutations/provider/staff/types";
import { editStaffMutation } from "./mutations/provider/staff/editStaff";
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
import { editProfileProviderMutation } from "./mutations/provider/auth/editProfile";
import { providerBookingDoneMutation } from "./mutations/provider/booking/booking_done";
import { providerBookingCancelMutation } from "./mutations/provider/booking/booking_cancel";
import { clientBookingRateMutation } from "./mutations/client/booking/booking_rate";

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
   * Provider edit profile mutation
   */
  editProfileProvider: async (
    _: any,
    editProfileProviderArgs: IEditProfileProviderArgs,
    ctx: IContext
  ) => {
    return editProfileProviderMutation(_, editProfileProviderArgs, ctx);
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
};
