import { RequestHolder } from "./requestHolder";
import type {
  LoginResponse,
  UserCreateRequest,
  UserCreatedResponse,
} from "./models";

export class AuthController extends RequestHolder {
  async login(data: {
    email: string;
    password: string;
  }): Promise<LoginResponse> {
    const loginResponse = await this.request.post(
      "https://shopdemo-alex-hot.koyeb.app/api/auth/login",
      {
        data,
      }
    );

    return loginResponse.json() as Promise<LoginResponse>;
  }

  async createNewUser(data: UserCreateRequest): Promise<UserCreatedResponse> {
    const resp = await this.request.post(
      "https://shopdemo-alex-hot.koyeb.app/api/auth/register",
      {
        data,
      }
    );

    return resp.json() as Promise<UserCreatedResponse>;
  }
}
