import { useState, useEffect, useRef } from "react";
import { Section } from "@appTypes/domain.types";
import { useNavigation } from "@context/NavigationContext";
import { useTheme } from "@context/ThemeContext";
import { useLanguage } from "@context/LanguageContext";
import LangSelector from "@components/common/LangSelector";
import logoExpojuy from "@assets/EXPOJUY_Logo2026/RGB/expojuy26_horizontal.png";

export default function NavBar() {
  const { activeSection, navigate } = useNavigation();
  const { darkMode, toggleDarkMode } = useTheme();
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cierre de menú "Más ▾" al hacer click afuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Enlaces Principales (visibles en desktop/laptop)
  const primaryLinks: [Section, string][] = [
    ["inicio", t("home")],
    ["explorar", t("exhibitors")],
    ["agenda", t("agenda")],
    ["negocios", "Ronda B2B"],
    ["plano", t("map")],
    ["descubrí", "Descubrí Jujuy"],
  ];

  // Enlaces Secundarios (desplegables en desktop)
  const secondaryLinks: [Section, string][] = [
    ["data", "ExpoJuy DATA"],
    ["noticias", t("news")],
    ["sobre", t("about")],
    ["faq", t("faq")],
    ["contacto", t("contact")],
  ];

  // Todos los enlaces (para menú móvil/tablet)
  const allLinks: [Section, string][] = [
    ...primaryLinks,
    ...secondaryLinks,
  ];

  const goTo = (section: Section) => {
    navigate(section);
    setMenuOpen(false);
    setMoreOpen(false);
  };

  const isSecondaryActive = secondaryLinks.some(([s]) => s === activeSection);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300 backdrop-blur-xl border-b border-black/5 dark:border-white/10 shadow-sm"
      style={{
        background: "var(--t-nav-bg)",
      }}
    >
      <nav aria-label="Navegación principal" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-3 md:gap-6 py-1">
          {/* BRAND LOGO */}
          <button
            type="button"
            onClick={() => goTo("inicio")}
            className="shrink-0 rounded-xl p-1 transition-all duration-300 hover:scale-105 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1DBECB] cursor-pointer"
            aria-label="ExpoJuy 2026 - Inicio"
          >
            <img
              src={logoExpojuy}
              alt="ExpoJuy 2026"
              className="h-8 sm:h-9 md:h-10 w-auto max-w-[150px] sm:max-w-[170px] object-contain transition-all"
              style={{ mixBlendMode: darkMode ? "lighten" : "normal" }}
            />
          </button>

          {/* DESKTOP NAVIGATION LINKS (Pills limpia y adaptativa) */}
          <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 xl:gap-1.5 lg:flex">
            {primaryLinks.map(([section, label]) => {
              const isActive = activeSection === section;
              return (
                <button
                  type="button"
                  key={section}
                  onClick={() => goTo(section)}
                  className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#7209B7] text-white shadow-md shadow-[#7209B7]/30 scale-105"
                      : "text-[var(--t-text)] hover:bg-[#7209B7]/10 hover:text-[#7209B7] dark:hover:text-[#A881FC]"
                  }`}
                >
                  {label}
                </button>
              );
            })}

            {/* MENÚ DESPLEGABLE "MÁS ▾" PARA PANTALLAS DESKTOP */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setMoreOpen(!moreOpen)}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-300 flex items-center gap-1 cursor-pointer ${
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

              {/* POPUP DE MÁS SECCIONES */}
              {moreOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl border border-black/10 dark:border-white/15 bg-white/95 dark:bg-[#1A1A2E]/95 p-2 shadow-2xl backdrop-blur-2xl animate-fade-in z-50 transition-all">
                  {secondaryLinks.map(([section, label]) => {
                    const isActive = activeSection === section;
                    return (
                      <button
                        type="button"
                        key={section}
                        onClick={() => goTo(section)}
                        className={`w-full rounded-xl px-3 py-2 text-left text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center justify-between ${
                          isActive
                            ? "bg-[#7209B7] text-white shadow-sm font-bold"
                            : "text-[var(--t-text)] hover:bg-slate-100 dark:hover:bg-white/10 hover:text-[#7209B7] dark:hover:text-[#A881FC]"
                        }`}
                      >
                        <span>{label}</span>
                        {isActive && <span className="text-[10px]">✓</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* CONTROLES DE LA DERECHA (TEMA, IDIOMA, B2B SHORTCUT Y HAMBURGER) */}
          <div className="flex shrink-0 items-center gap-2">
            {/* Acceso Directo B2B */}
            <button
              type="button"
              onClick={() => goTo("negocios")}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#7209B7] to-[#1DBECB] px-3.5 py-1.5 text-xs font-extrabold text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              <span>🤝</span>
              <span>Ronda B2B</span>
            </button>

            {/* Selector de Modo Claro/Oscuro */}
            <button
              type="button"
              onClick={toggleDarkMode}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1DBECB]/40 bg-white/5 text-[var(--t-text)] shadow-sm transition-all hover:scale-110 hover:border-[#1DBECB] hover:bg-[#1DBECB]/10 cursor-pointer"
              aria-label={darkMode ? t("lightMode") : t("darkMode")}
              title={darkMode ? t("lightMode") : t("darkMode")}
            >
              <span className="text-sm transition-transform duration-500">{darkMode ? "☀" : "☾"}</span>
            </button>

            {/* Selector de Idioma */}
            <LangSelector />

            {/* Botón Menú Hamburguesa (Mobile & Tablet) */}
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 dark:border-white/15 bg-white/10 text-xl lg:hidden text-[var(--t-text)] transition-all hover:scale-105 focus:outline-none cursor-pointer"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* MENÚ DESPLEGABLE MÓVIL Y TABLET (FULL RESPONSIVE DRAWER) */}
        {menuOpen && (
          <div className="lg:hidden border-t border-black/5 dark:border-white/10 py-4 px-2 animate-fade-in transition-all">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {allLinks.map(([section, label]) => {
                const isActive = activeSection === section;
                return (
                  <button
                    type="button"
                    key={section}
                    onClick={() => goTo(section)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-left text-xs font-bold transition-all duration-200 cursor-pointer ${
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

            {/* Botón B2B destacado dentro del menú móvil */}
            <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/10 sm:hidden">
              <button
                type="button"
                onClick={() => goTo("negocios")}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7209B7] to-[#1DBECB] py-3 text-xs font-extrabold text-white shadow-lg cursor-pointer"
              >
                <span>🤝</span>
                <span>Ronda de Negocios B2B</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
