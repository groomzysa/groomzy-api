import { PaginationType } from "../types";

export interface IGalleries {
  providerId?: number;
  limit?: number;
  cursor?: number;
  page?: number;
  paginationType?: PaginationType;
}

export interface IGallery {
  galleryId: number;
}
