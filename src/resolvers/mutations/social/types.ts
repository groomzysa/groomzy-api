import { Social } from "@prisma/client";

export interface IAddSocial
  extends Omit<Social, "id" | "createdAt" | "updatedAt" | "providerId"> {}

export interface IUpdateSocial {
  socialId: number;
  name?: string;
  username?: string;
}

export interface IDeleteSocial {
  socialId: number;
}
