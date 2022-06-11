import { ProviderSocial } from "@prisma/client";

export interface IAddSocialArgs extends Omit<ProviderSocial, "id"> {}

export interface IDeleteSocialArgs {
  socialId: number;
}

export interface IEditSocialArgs {
  socialId: number;
  name?: string;
  url?: string;
}
