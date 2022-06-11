import { ProviderProfile } from "@prisma/client";

export interface IAddProfileArgs
  extends Omit<ProviderProfile, "id" | "providerId"> {
  tradingProfileImage?: File;
}

export interface IDeleteStaffArgs {
  staffId: number;
}

export interface IEditStaffArgs {
  staffId: number;
  fullName?: string;
}
