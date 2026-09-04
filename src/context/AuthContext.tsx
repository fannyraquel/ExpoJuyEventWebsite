import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, UserRole, Permission } from "../types/auth.types";
import { hasPermission } from "../config/roles.config";
import { authService } from "../api/services/authService";
import { API_CONFIG } from "../config/api.config";

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  switchRole: (role: UserRole) => Promise<void>;
  checkPermission: (permission: Permission) => boolean;
  logout: () => Promise<void>;
}

const DEFAULT_USER: User = {
  id: "guest-user",
  name: "Visitante ExpoJuy",
  email: "visitante@expojuy.gob.ar",
  role: "visitor",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem(API_CONFIG.userStorageKey);
    return savedUser ? JSON.parse(savedUser) : DEFAULT_USER;
  });

  const role: UserRole = user?.role || "visitor";

  useEffect(() => {
    if (user) {
      localStorage.setItem(API_CONFIG.userStorageKey, JSON.stringify(user));
    } else {
      localStorage.removeItem(API_CONFIG.userStorageKey);
    }
  }, [user]);

  const switchRole = async (newRole: UserRole) => {
    const res = await authService.login(`${newRole}@expojuy.gob.ar`, newRole);
    if (res.success && res.data) {
      setUser(res.data.user);
      localStorage.setItem(API_CONFIG.tokenStorageKey, res.data.token);
    }
  };

  const checkPermission = (permission: Permission): boolean => {
    return hasPermission(role, permission);
  };

  const logout = async () => {
    await authService.logout();
    setUser(DEFAULT_USER);
    localStorage.removeItem(API_CONFIG.tokenStorageKey);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user && user.role !== "visitor",
        switchRole,
        checkPermission,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
