import { Address } from "@prisma/client";

export interface IAddTradingInfo {
  tradingName: string;
  phone: string;
  logo?: File;
}

export interface IUpdateTradingInfo {
  providerId: number;
  tradingName?: string;
  phone?: string;
  logo?: File;
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
