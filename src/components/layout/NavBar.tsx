import { useState } from "react";
import { Section } from "../../types/domain.types";
import { useNavigation } from "../../context/NavigationContext";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import LangSelector from "../common/LangSelector";

export default function NavBar() {
  const { activeSection, navigate } = useNavigation();
  const { darkMode, toggleDarkMode } = useTheme();
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const links: [Section, string][] = [
    ["inicio", t("home")],
    ["sobre", t("about")],
    ["explorar", t("exhibitors")],
    ["agenda", t("agenda")],
    ["negocios", "Ronda de Negocios"],
    ["plano", t("map")],
    ["descubrí", "Descubrí Jujuy"],
    ["data", "ExpoJuy DATA"],
    ["noticias", t("news")],
    ["faq", t("faq")],
    ["contacto", t("contact")],
  ];

  const goTo = (section: Section) => {
    navigate(section);
    setMenuOpen(false);
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors"
      style={{
        background: "var(--t-nav-bg)",
        borderColor: "var(--t-nav-border)",
      }}
    >
      <nav aria-label="Navegación principal" className="mx-auto max-w-7xl px-4">
        <div className="flex min-h-16 items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => goTo("inicio")}
            className="shrink-0 rounded-lg p-1 transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1DBECB]"
            aria-label="ExpoJuy 2026 - Inicio"
          >
            <img
              src="/src/assets/EXPOJUY_Logo2026/RGB/expojuy26_horizontal.png"
              alt="ExpoJuy 2026"
              className="h-8 w-auto max-w-[145px] object-contain sm:h-9"
              style={{ mixBlendMode: darkMode ? "lighten" : "normal" }}
            />
          </button>

          <div className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex">
            {links.map(([section, label]) => (
              <button
                type="button"
                key={section}
                onClick={() => goTo(section)}
                className="whitespace-nowrap rounded-lg px-2.5 py-2 text-xs font-semibold transition-colors hover:bg-[#7209B7]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1DBECB] xl:px-3"
                style={{
                  background: activeSection === section ? "#7209B7" : "transparent",
                  color: activeSection === section ? "#FFFFFF" : "var(--t-text)",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={toggleDarkMode}
              className="flex h-9 w-9 items-center justify-center rounded-full border transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1DBECB]"
              style={{ borderColor: "#1DBECB", color: "var(--t-text)" }}
              aria-label={darkMode ? t("lightMode") : t("darkMode")}
              title={darkMode ? t("lightMode") : t("darkMode")}
            >
              <span aria-hidden="true">{darkMode ? "☀" : "☾"}</span>
            </button>
            <LangSelector />
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border text-lg lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1DBECB]"
              style={{ borderColor: "var(--t-card-border)", color: "var(--t-text)" }}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? "×" : "☰"}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            className="grid grid-cols-1 gap-1 border-t py-3 sm:grid-cols-2 lg:hidden"
            style={{ borderColor: "var(--t-card-border)" }}
          >
            {links.map(([section, label]) => (
              <button
                type="button"
                key={section}
                onClick={() => goTo(section)}
                className="rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition-colors hover:bg-[#7209B7]/10"
                style={{
                  background: activeSection === section ? "#7209B7" : "transparent",
                  color: activeSection === section ? "#FFFFFF" : "var(--t-text)",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
