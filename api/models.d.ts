export interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}

export interface UserCreatedResponse {
  success: boolean;
  subscribed: boolean;
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}

export interface UserCreateRequest {
  isSubscribed: boolean;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}
