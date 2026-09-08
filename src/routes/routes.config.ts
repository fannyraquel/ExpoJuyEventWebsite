import { ComponentType } from "react";
import { RouteConfig } from "../types/navigation.types";
import InicioPage from "../pages/home/InicioPage";
import SobrePage from "../pages/about/SobrePage";
import ExplorarPage from "../pages/explorar/ExplorarPage";
import AgendaPage from "../pages/agenda/AgendaPage";
import RondaNegociosPage from "../pages/negocios/RondaNegociosPage";
import PlanoPage from "../pages/plano/PlanoPage";
import DescubriJujuyPage from "../pages/territorio/DescubriJujuyPage";
import NoticiasPage from "../pages/noticias/NoticiasPage";
import FAQPage from "../pages/faq/PreguntasFrecuentesPage";
import ContactoPage from "../pages/contacto/ContactoPage";
import AcreditacionPage from "../pages/acreditacion/AcreditacionPage";
import TesoreriaValidacionPage from "../pages/admin/TesoreriaValidacionPage";
import RecepcionScannerPage from "../pages/recepcion/RecepcionScannerPage";
import SponsorsPage from "../pages/sponsors/SponsorsPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import LoginPage from "../pages/auth/LoginPage";

export interface RouteItem extends RouteConfig {
  component: ComponentType;
}

export const ROUTES: RouteItem[] = [
  { path: "/", sectionKey: "inicio", label: "Inicio", inNavbar: true, component: InicioPage },
  { path: "/sponsors", sectionKey: "sponsors", label: "Sponsors Oficiales", inNavbar: true, component: SponsorsPage },
  { path: "/sobre", sectionKey: "sobre", label: "Sobre ExpoJuy 2026", inNavbar: true, component: SobrePage },
  { path: "/explorar", sectionKey: "explorar", label: "Expositores", inNavbar: true, component: ExplorarPage },
  { path: "/agenda", sectionKey: "agenda", label: "Agenda", inNavbar: true, component: AgendaPage },
  { path: "/negocios", sectionKey: "negocios", label: "Ronda Negocios", inNavbar: true, component: RondaNegociosPage },
  { path: "/plano", sectionKey: "plano", label: "Plano", inNavbar: true, component: PlanoPage },
  { path: "/descubri", sectionKey: "descubrí", label: "Descubrí Jujuy", inNavbar: true, component: DescubriJujuyPage },
  { path: "/noticias", sectionKey: "noticias", label: "Noticias", inNavbar: true, component: NoticiasPage },
  { path: "/faq", sectionKey: "faq", label: "Preguntas frecuentes", inNavbar: true, component: FAQPage },
  { path: "/contacto", sectionKey: "contacto", label: "Contacto", inNavbar: true, component: ContactoPage },
  { path: "/acreditacion", sectionKey: "acreditacion", label: "Acreditación Visitantes", inNavbar: true, component: AcreditacionPage },
  { path: "/tesoreria", sectionKey: "tesorería", label: "Secretaría de Pagos", inNavbar: true, requiredRole: "admin", component: TesoreriaValidacionPage },
  { path: "/recepcion", sectionKey: "recepción", label: "Control de Acceso (Recepción)", inNavbar: true, requiredRole: "admin", component: RecepcionScannerPage },
  { path: "/admin", sectionKey: "admin", label: "Panel Admin", inNavbar: true, requiredRole: "admin", component: AdminDashboardPage },
  { path: "/login", sectionKey: "login", label: "Perfil & Roles", inNavbar: true, component: LoginPage },
];
