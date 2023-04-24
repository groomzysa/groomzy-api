import { PaginationType } from "../types";

export interface IServices {
  providerId?: number;
  limit?: number;
  cursor?: number;
  page?: number;
  paginationType?: PaginationType;
}

export interface IService {
  serviceId: number;
}
