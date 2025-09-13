export interface SignInForm {
  email: string;
  password: string;
}

export interface AuthResponse { accessToken: string; userId: string; }