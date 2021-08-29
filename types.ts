export interface RegisterUser {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}
export interface LoginUser {
  email: string;
  password: string;
}
export interface Token {
  data: string;
  iat: number;
  exp: number;
}
export interface passwordHash {
  password: string;
}
