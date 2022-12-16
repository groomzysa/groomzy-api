import { Service, DurationUnitType, CategoryType } from "@prisma/client";

export interface IAddService
  extends Omit<Service, "id" | "createdAt" | "updatedAt"> {}

export interface IUpdateService {
  serviceId: number;
  name?: string;
  description?: string;
  duration?: number;
  durationUnit?: DurationUnitType;
  inHouse?: boolean;
  price?: number;
  category?: CategoryType;
}

export interface IDeleteService {
  serviceId: number;
}
