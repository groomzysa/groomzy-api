import { PaginationType } from "../types";

export interface IStaffs {
  providerId?: number;
  limit?: number;
  cursor?: number;
  page?: number;
  paginationType?: PaginationType;
}

export interface IStaff {
  staffId: number;
}
