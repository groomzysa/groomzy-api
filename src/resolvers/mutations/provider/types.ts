import { Address } from "@prisma/client";
import { Upload } from "graphql-upload-ts/dist/Upload";

export interface IAddTradingInfo {
  tradingName: string;
  phone: string;
  logo?: Blob;
}

export interface IUpdateTradingInfo {
  providerId: number;
  tradingName?: string;
  phone?: string;
  logo?: Blob;
  logoUrl?: string;
}

export interface IAddTradingAddress
  extends Omit<Address, "id" | "createdAt" | "updatedAt" | "providerId"> {}

export interface IUpdateTradingAddress {
  addressId: number;
  streetNumber?: string;
  streetName?: string;
  town?: string;
  city?: string;
  province?: string;
  areaCode?: string;
}
