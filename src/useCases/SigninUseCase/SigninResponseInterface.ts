import { User } from "../../entities/User";

export interface SignInResponse {
    user: User;
    token: string;
  }