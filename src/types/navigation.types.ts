import { Section } from "./domain.types";
import { UserRole } from "./auth.types";

export interface RouteConfig {
  path: string;
  sectionKey: Section;
  label: string;
  inNavbar: boolean;
  requiredRole?: UserRole;
}
