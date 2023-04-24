import { PaginationType } from "../types";

export interface IOperatingTimes {
  limit?: number;
  cursor?: number;
  page?: number;
  paginationType?: PaginationType;
}

export interface IOperatingTime {
  operatingTimeId: number;
}
