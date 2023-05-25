export interface IAddComment {
  message: string;
  parentId?: number;
  providerId?: number;
  clientId?: number;
}

export interface IUpdateComment {
  commentId: number;
  message?: string;
}

export interface IDeleteComment {
  commentId: number;
}
