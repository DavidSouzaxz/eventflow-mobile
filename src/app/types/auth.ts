export interface User {
  id: String;
  name: string;
  email: string;
  avatar_url: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
