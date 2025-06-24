export interface IUserCreateRequest {
  name: string;
  email: string;
}

export interface IUserUpdateRequest extends IUserCreateRequest {}
