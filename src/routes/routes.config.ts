import { ComponentType } from "react";
import { RouteConfig } from "../types/navigation.types";
import InicioPage from "../pages/home/InicioPage";
import SobrePage from "../pages/about/SobrePage";
import ExplorarPage from "../pages/explorar/ExplorarPage";
import AgendaPage from "../pages/agenda/AgendaPage";
import RondaNegociosPage from "../pages/negocios/RondaNegociosPage";
import PlanoPage from "../pages/plano/PlanoPage";
import BioceanicoPage from "../pages/territorio/BioceanicoPage";
import DescubriJujuyPage from "../pages/territorio/DescubriJujuyPage";
import ExpoJuyDataPage from "../pages/data/ExpoJuyDataPage";
import NoticiasPage from "../pages/noticias/NoticiasPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import LoginPage from "../pages/auth/LoginPage";

export interface RouteItem extends RouteConfig {
  component: ComponentType;
}

export const ROUTES: RouteItem[] = [
  { path: "/", sectionKey: "inicio", label: "Inicio", inNavbar: true, component: InicioPage },
  { path: "/sobre", sectionKey: "sobre", label: "Sobre ExpoJuy", inNavbar: false, component: SobrePage },
  { path: "/explorar", sectionKey: "explorar", label: "Explorar", inNavbar: true, component: ExplorarPage },
  { path: "/agenda", sectionKey: "agenda", label: "Agenda", inNavbar: true, component: AgendaPage },
  { path: "/negocios", sectionKey: "negocios", label: "Ronda Negocios", inNavbar: true, component: RondaNegociosPage },
  { path: "/plano", sectionKey: "plano", label: "Plano", inNavbar: true, component: PlanoPage },
  { path: "/bioceanico", sectionKey: "bioceánico", label: "Corredor Bioceánico", inNavbar: false, component: BioceanicoPage },
  { path: "/descubri", sectionKey: "descubrí", label: "Descubrí Jujuy", inNavbar: true, component: DescubriJujuyPage },
  { path: "/data", sectionKey: "data", label: "ExpoJuy DATA", inNavbar: true, component: ExpoJuyDataPage },
  { path: "/noticias", sectionKey: "noticias", label: "Noticias", inNavbar: true, component: NoticiasPage },
  { path: "/admin", sectionKey: "admin", label: "Panel Admin", inNavbar: false, requiredRole: "admin", component: AdminDashboardPage },
  { path: "/login", sectionKey: "login", label: "Perfil & Roles", inNavbar: false, component: LoginPage },
];
