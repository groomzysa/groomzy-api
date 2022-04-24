import { Provider } from "@prisma/client";

export interface ISignupProviderArgs extends Provider {}

export interface IEditProfileProviderArgs {
  fullName?: string;
  streetNumber?: string;
  streetName?: string;
  suburbName?: string;
  cityName?: string;
  provinceName?: string;
  areaCode?: string;
  latitude?: number;
  longitude?: number;
}

export interface ISignInProviderArgs {
  email: string;
  password: string;
  verifyPin?: string | number;
}
