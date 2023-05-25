import { PaginationType } from "../types";

export interface IComments {
  providerId?: number;
  limit?: number;
  cursor?: number;
  page?: number;
  paginationType?: PaginationType;
}

export interface IComment {
  commentId: number;
}
