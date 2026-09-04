import { Permission, UserRole } from "../types/auth.types";

export interface RoleDefinition {
  id: UserRole;
  label: string;
  badgeBg: string;
  badgeColor: string;
  permissions: Permission[];
}

export const ROLES: Record<UserRole, RoleDefinition> = {
  visitor: {
    id: "visitor",
    label: "Visitante",
    badgeBg: "#0891B2",
    badgeColor: "#FFFFFF",
    permissions: ["view_public", "view_data_indicators"],
  },
  exhibitor: {
    id: "exhibitor",
    label: "Expositor",
    badgeBg: "#7209B7",
    badgeColor: "#FFFFFF",
    permissions: ["view_public", "view_data_indicators", "connect_b2b", "manage_stands"],
  },
  press: {
    id: "press",
    label: "Prensa",
    badgeBg: "#D97706",
    badgeColor: "#FFFFFF",
    permissions: ["view_public", "view_data_indicators"],
  },
  admin: {
    id: "admin",
    label: "Administrador",
    badgeBg: "#DC2626",
    badgeColor: "#FFFFFF",
    permissions: [
      "view_public",
      "view_data_indicators",
      "connect_b2b",
      "manage_agenda",
      "manage_stands",
      "admin_access",
    ],
  },
};

export const hasPermission = (userRole: UserRole, permission: Permission): boolean => {
  return ROLES[userRole]?.permissions.includes(permission) ?? false;
};
