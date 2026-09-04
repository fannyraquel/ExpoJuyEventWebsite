export type UserRole = "visitor" | "exhibitor" | "press" | "admin";

export type Permission =
  | "view_public"
  | "view_data_indicators"
  | "connect_b2b"
  | "manage_agenda"
  | "manage_stands"
  | "admin_access";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  empresaId?: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}
