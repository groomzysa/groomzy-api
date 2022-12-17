import { Address, User, UserRole } from "@prisma/client";

export interface IAddUser
  extends Omit<
    User,
    "id" | "createdAt" | "updatedAt" | "userImageUrl" | "addressId"
  > {
  userImage?: File;
}

export interface ISignIn {
  email: string;
  role: UserRole;
  password: string;
}

export interface IUpdateAccount {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  userImage?: File;
}

export interface IAddAccountAddress
  extends Omit<Address, "id" | "createdAt" | "updatedAt" | "providerId"> {}

export interface IUpdateAccountAddress {
  addressId: number;
  streetNumber?: string;
  streetName?: string;
  town?: string;
  city?: string;
  province?: string;
  areaCode?: string;
}

export interface IRequestPasswordReset {
  email: string;
  role: UserRole;
}

export interface IResetPassword {
  passwordResetOTP: string;
  password: string;
}
