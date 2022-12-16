import { Staff } from "@prisma/client";

export interface IAddStaff
  extends Omit<Staff, "id" | "createdAt" | "updatedAt" | "businessProfileId"> {}

export interface IUpdateStaff {
  staffId: number;
  firstName?: string;
  lastName?: string;
}

export interface IDeleteStaff {
  staffId: number;
}
