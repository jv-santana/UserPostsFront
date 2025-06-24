export interface IPostCreateRequest {
  title: string;
  content: string;
  authorId: number;
}

export interface IPostUpdateRequest
  extends Omit<IPostCreateRequest, "authorId"> {}
