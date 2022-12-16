import { DayType, OperatingTime } from "@prisma/client";

export interface IAddOperatingTime
  extends Omit<
    OperatingTime,
    "id" | "createdAt" | "updatedAt" | "providerId"
  > {}

export interface IUpdateOperatingTime {
  operatingTimeId: number;
  day?: DayType;
  opens?: string;
  closes?: string;
}

export interface IDeleteOperatingTime {
  operatingTimeId: number;
}
