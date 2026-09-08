import { useState, useEffect, useRef } from "react";
import { Section } from "@appTypes/domain.types";
import { useNavigation } from "@context/NavigationContext";
import { useTheme } from "@context/ThemeContext";
import { useLanguage } from "@context/LanguageContext";
import { useAuth } from "@context/AuthContext";
import LangSelector from "@components/common/LangSelector";
import logoExpojuy from "@assets/EXPOJUY_Logo2026/RGB/expojuy26_isologotipo.png";

export default function NavBar() {
  const { activeSection, navigate } = useNavigation();
  const { darkMode, toggleDarkMode } = useTheme();
  const { t } = useLanguage();
  const { role, user } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  const moreDropdownRef = useRef<HTMLDivElement>(null);
  const adminDropdownRef = useRef<HTMLDivElement>(null);

  // Cierre de menús desplegables al hacer click afuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        moreDropdownRef.current &&
        !moreDropdownRef.current.contains(event.target as Node)
      ) {
        setMoreOpen(false);
      }
      if (
        adminDropdownRef.current &&
        !adminDropdownRef.current.contains(event.target as Node)
      ) {
        setAdminOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 1. Enlaces Principales Públicos en ORDEN SOLICITADO
  const primaryLinks: [Section, string][] = [
    ["inicio", t("home")],
    ["agenda", t("agenda")],
    ["negocios", "Ronda B2B"],
    ["plano", t("map")],
    ["explorar", t("exhibitors")],
    ["sponsors", "Sponsors"],
  ];

  // 2. Enlaces Secundarios Públicos (Menú "Más ▾")
  const secondaryPublicLinks: [Section, string][] = [
    ["sobre", t("about")],
    ["descubrí", "Descubrí Jujuy"],
    ["acreditacion", "Acreditación Visitantes"],
    ["noticias", t("news")],
    ["faq", t("faq")],
    ["contacto", t("contact")],
  ];

  // 3. Enlaces Exclusivos de Gestión & Administración (Menú "Gestión Staff ▾")
  const adminLinks: [Section, string, string][] = [
    ["tesorería", "Secretaría de Pagos", "Validar transferencias y comprobantes"],
    ["recepción", "Control de Acceso", "Escáner QR en vivo y venta física"],
    ["admin", "Panel Admin General", "Control de métricas y exportación"],
    ["login", "Perfil & Roles", "Cambiar de rol / Autenticación"],
  ];

  const goTo = (section: Section) => {
    navigate(section);
    setMenuOpen(false);
    setMoreOpen(false);
    setAdminOpen(false);
  };

  const isSecondaryActive = secondaryPublicLinks.some(([s]) => s === activeSection);
  const isAdminActive = adminLinks.some(([s]) => s === activeSection);

  const getRoleLabel = () => {
    switch (role) {
      case "admin":
        return "Administrador / Staff";
      case "exhibitor":
        return "Expositor B2B";
      case "press":
        return "Prensa";
      default:
        return "Visitante";
    }
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300 backdrop-blur-2xl border-b border-black/10 dark:border-white/10 shadow-md"
      style={{
        background: "var(--t-nav-bg)",
      }}
    >
      <nav aria-label="Navegación principal" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-3 py-1.5 flex-nowrap">
          {/* BRAND LOGO CON BRILLO GLOW */}
          <button
            type="button"
            onClick={() => goTo("inicio")}
            className="group relative shrink-0 rounded-xl p-1 transition-all duration-300 hover:scale-105 focus:outline-none cursor-pointer"
            aria-label="ExpoJuy 2026 - Inicio"
          >
            <span
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-10 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7209B7]/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 dark:bg-[#1DBECB]/30"
              aria-hidden="true"
            />
            <img
              src={logoExpojuy}
              alt="ExpoJuy 2026"
              className="relative z-10 h-10 sm:h-11 md:h-12 w-auto max-w-[75px] object-contain transition-all duration-300 dark:brightness-125 dark:contrast-125 dark:saturate-125 dark:mix-blend-screen"
            />
          </button>

          {/* NAVEGACIÓN DESKTOP (PILLS DE ALTO IMPACTO Y SIN SOLAPAMIENTO) */}
          <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 xl:gap-2 xl:flex flex-nowrap overflow-hidden">
            {primaryLinks.map(([section, label]) => {
              const isActive = activeSection === section;
              return (
                <button
                  type="button"
                  key={section}
                  onClick={() => goTo(section)}
                  className={`whitespace-nowrap shrink-0 rounded-full px-3 py-1.5 text-xs font-extrabold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-[#7209B7] to-[#9D4EDD] text-white shadow-lg shadow-[#7209B7]/40 scale-105"
                      : "text-[var(--t-text)] hover:bg-[#7209B7]/10 hover:text-[#7209B7] dark:hover:text-[#A881FC]"
                  }`}
                >
                  {label}
                </button>
              );
            })}

            {/* MENÚ DESPLEGABLE "MÁS ▾" */}
            <div className="relative shrink-0" ref={moreDropdownRef}>
              <button
                type="button"
                onClick={() => {
                  setMoreOpen(!moreOpen);
                  setAdminOpen(false);
                }}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-extrabold transition-all duration-300 flex items-center gap-1 cursor-pointer ${
                  isSecondaryActive || moreOpen
                    ? "bg-[#1DBECB] text-slate-950 shadow-md shadow-[#1DBECB]/30"
                    : "text-[var(--t-text)] hover:bg-[#1DBECB]/10 hover:text-[#1DBECB]"
                }`}
              >
                <span>Más</span>
                <span className={`text-[10px] transition-transform duration-300 ${moreOpen ? "rotate-180" : ""}`}>
                  ▾
                </span>
              </button>

              {/* POPUP DE SECCIONES SECUNDARIAS */}
              {moreOpen && (
                <div className="absolute right-0 top-full mt-2 w-60 max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-white/15 bg-white/95 dark:bg-[#15182C]/95 p-2 shadow-2xl backdrop-blur-2xl animate-fade-in z-50 transition-all space-y-1">
                  <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--t-text-muted)] border-b border-black/5 dark:border-white/10">
                    Secciones Informativas
                  </div>
                  {secondaryPublicLinks.map(([section, label]) => {
                    const isActive = activeSection === section;
                    return (
                      <button
                        type="button"
                        key={section}
                        onClick={() => goTo(section)}
                        className={`w-full rounded-xl px-3 py-2 text-left text-xs font-bold transition-all duration-200 cursor-pointer flex items-center justify-between ${
                          isActive
                            ? "bg-[#7209B7] text-white shadow-sm"
                            : "text-[var(--t-text)] hover:bg-slate-100 dark:hover:bg-white/10 hover:text-[#7209B7] dark:hover:text-[#A881FC]"
                        }`}
                      >
                        <span>{label}</span>
                        {isActive && <span className="text-xs">✓</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* MENÚ DESPLEGABLE EXCLUSIVO PARA ADMINISTRACIÓN Y STAFF */}
            <div className="relative shrink-0" ref={adminDropdownRef}>
              <button
                type="button"
                onClick={() => {
                  setAdminOpen(!adminOpen);
                  setMoreOpen(false);
                }}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-black transition-all duration-300 flex items-center gap-1.5 cursor-pointer border ${
                  isAdminActive || adminOpen
                    ? "bg-gradient-to-r from-purple-700 to-indigo-700 text-white border-purple-400 shadow-md shadow-purple-600/30 scale-105"
                    : "bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-indigo-500/10 border-purple-500/30 text-[#7209B7] dark:text-[#A881FC] hover:bg-purple-500/20"
                }`}
              >
                <span>Gestión Staff</span>
                <span className={`text-[10px] transition-transform duration-300 ${adminOpen ? "rotate-180" : ""}`}>
                  ▾
                </span>
              </button>

              {/* POPUP DE GESTIÓN ADMINISTRATIVA */}
              {adminOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 max-h-[85vh] overflow-y-auto rounded-2xl border border-purple-500/30 bg-white/95 dark:bg-[#121426]/95 p-3 shadow-2xl backdrop-blur-2xl animate-fade-in z-50 transition-all space-y-2">
                  <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-2.5 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-purple-600 dark:text-purple-300 block font-bold">
                        Sesión &amp; Permisos
                      </span>
                      <span className="text-xs font-black text-slate-900 dark:text-white block">
                        {user?.name || "Visitante"}
                      </span>
                    </div>
                    <span className="rounded-full bg-purple-600 text-white px-2 py-0.5 text-[9px] font-extrabold shadow-sm">
                      {getRoleLabel()}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--t-text-muted)] px-1 block">
                      Módulos de Gestión
                    </span>
                    {adminLinks.map(([section, label, sub]) => {
                      const isActive = activeSection === section;
                      return (
                        <button
                          type="button"
                          key={section}
                          onClick={() => goTo(section)}
                          className={`w-full rounded-xl p-2.5 text-left text-xs font-bold transition-all duration-200 cursor-pointer flex flex-col ${
                            isActive
                              ? "bg-[#7209B7] text-white shadow-md font-extrabold"
                              : "text-[var(--t-text)] hover:bg-slate-100 dark:hover:bg-white/10 hover:text-[#7209B7] dark:hover:text-[#A881FC]"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{label}</span>
                            {isActive && <span className="text-xs">●</span>}
                          </div>
                          <span
                            className={`text-[10px] font-normal mt-0.5 ${
                              isActive ? "text-purple-100" : "text-[var(--t-text-muted)]"
                            }`}
                          >
                            {sub}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CONTROLES DERECHA (ACREDITACIÓN SIEMPRE VISIBLE, TEMA, IDIOMA, HAMBURGER) */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 whitespace-nowrap">
            {/* Botón Acreditación (VISIBLE EN TODO MOMENTO EN CUALQUIER DISPOSITIVO) */}
            <button
              type="button"
              onClick={() => goTo("acreditacion")}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#7209B7] to-[#1DBECB] px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-black text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer shrink-0"
            >
              <span>Acreditación</span>
            </button>

            {/* Selector de Modo Claro/Oscuro */}
            <button
              type="button"
              onClick={toggleDarkMode}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#1DBECB]/40 bg-white/5 text-[var(--t-text)] shadow-sm transition-all hover:scale-110 hover:border-[#1DBECB] hover:bg-[#1DBECB]/10 cursor-pointer"
              aria-label={darkMode ? t("lightMode") : t("darkMode")}
              title={darkMode ? t("lightMode") : t("darkMode")}
            >
              <span className="text-sm transition-transform duration-500">{darkMode ? "☀" : "☾"}</span>
            </button>

            {/* Selector de Idioma */}
            <LangSelector />

            {/* Botón Menú Hamburguesa (Mobile & Tablet / Laptops < 1280px) */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-black/10 dark:border-white/15 bg-white/10 text-xl xl:hidden text-[var(--t-text)] transition-all hover:scale-105 focus:outline-none cursor-pointer"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* MENÚ MÓVIL Y TABLET DESPLEGABLE (PANTALLAS < 1280px) */}
        {menuOpen && (
          <div className="xl:hidden border-t border-black/5 dark:border-white/10 py-4 px-2 animate-fade-in transition-all space-y-4 max-h-[85vh] overflow-y-auto">
            {/* SECCIÓN 1: NAVEGACIÓN PRINCIPAL */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[var(--t-text-muted)] block mb-2 px-1">
                Navegación Principal
              </span>
              <div className="grid grid-cols-2 gap-2">
                {primaryLinks.map(([section, label]) => {
                  const isActive = activeSection === section;
                  return (
                    <button
                      type="button"
                      key={section}
                      onClick={() => goTo(section)}
                      className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-[#7209B7] text-white shadow-md shadow-[#7209B7]/30"
                          : "bg-[var(--t-surface)] text-[var(--t-text)] border border-[var(--t-card-border)] hover:bg-[#7209B7]/10"
                      }`}
                    >
                      <span>{label}</span>
                      {isActive && <span className="text-xs">●</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECCIÓN 2: INFORMACIÓN Y MÁS */}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[var(--t-text-muted)] block mb-2 px-1">
                Explorar &amp; Más
              </span>
              <div className="grid grid-cols-2 gap-2">
                {secondaryPublicLinks.map(([section, label]) => {
                  const isActive = activeSection === section;
                  return (
                    <button
                      type="button"
                      key={section}
                      onClick={() => goTo(section)}
                      className={`flex items-center justify-between rounded-xl px-3.5 py-2 text-left text-xs font-bold transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-[#1DBECB] text-slate-950 font-black shadow-md"
                          : "bg-[var(--t-surface)] text-[var(--t-text)] border border-[var(--t-card-border)]"
                      }`}
                    >
                      <span className="truncate">{label}</span>
                      {isActive && <span className="text-xs">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECCIÓN 3: MÓDULOS DE ADMINISTRACIÓN Y STAFF */}
            <div className="pt-2 border-t border-purple-500/20">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-purple-600 dark:text-purple-300">
                  Gestión Staff &amp; Roles
                </span>
                <span className="text-[10px] font-extrabold bg-purple-500/20 text-purple-600 dark:text-purple-300 px-2 py-0.5 rounded-full">
                  {getRoleLabel()}
                </span>
              </div>
              <div className="space-y-1.5">
                {adminLinks.map(([section, label, sub]) => {
                  const isActive = activeSection === section;
                  return (
                    <button
                      type="button"
                      key={section}
                      onClick={() => goTo(section)}
                      className={`w-full flex flex-col rounded-xl px-3.5 py-2 text-left transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-purple-700 text-white font-black shadow-md"
                          : "bg-purple-500/10 text-[var(--t-text)] border border-purple-500/20 hover:bg-purple-500/20"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-extrabold">
                        <span>{label}</span>
                        {isActive && <span className="text-xs">●</span>}
                      </div>
                      <span className="text-[10px] font-normal opacity-80">{sub}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
