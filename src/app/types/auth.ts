export interface User {
  id: String;
  name: string;
  email: string;
  avatarUrl: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
