import { useState } from "react";
import { Section } from "../../types/domain.types";
import { useNavigation } from "../../context/NavigationContext";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { ROLES } from "../../config/roles.config";
import LangSelector from "../common/LangSelector";

export default function NavBar() {
  const { activeSection, setActiveSection, navigate } = useNavigation();
  const { darkMode, setDarkMode } = useTheme();
  const { role } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const links: [Section, string][] = [
    ["inicio", "Inicio"],
    ["explorar", "Explorar"],
    ["agenda", "Agenda"],
    ["negocios", "Ronda Negocios"],
    ["plano", "Plano"],
    ["descubrí", "Descubrí Jujuy"],
    ["data", "ExpoJuy DATA"],
    ["noticias", "Noticias"],
  ];

  const roleInfo = ROLES[role] || ROLES.visitor;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b-2 transition-colors duration-300 w-full max-w-full overflow-hidden"
      style={{ background: "var(--t-nav-bg)", borderBottomColor: "var(--t-nav-border)" }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 flex items-center justify-between h-14">
        {/* Logo */}
        <button onClick={() => setActiveSection("inicio")} className="shrink-0">
          <img
            src="/src/assets/EXPOJUY_Logo2026/RGB/expojuy26_horizontal.png"
            alt="ExpoJuy 2026"
            className="h-7 sm:h-9 max-w-[130px] sm:max-w-none object-contain transition-all duration-300"
            style={{ mixBlendMode: darkMode ? "lighten" : "normal" }}
          />
        </button>

        {/* Links escritorio */}
        <div className="hidden lg:flex items-center gap-1">
          {links.map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className="px-3 py-1.5 rounded text-xs font-semibold transition-all"
              style={{
                background: activeSection === key ? "#7209B7" : "transparent",
                color: activeSection === key ? "#FFFFFF" : "var(--t-text)",
              }}
              onMouseEnter={(e) => {
                if (activeSection !== key) (e.currentTarget as HTMLElement).style.background = "rgba(114,9,183,0.12)";
              }}
              onMouseLeave={(e) => {
                if (activeSection !== key) (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Controles derechos */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Badge de Rol actual */}
          <button
            onClick={() => navigate("login")}
            className="hidden md:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-transform hover:scale-105"
            style={{ background: roleInfo.badgeBg, color: roleInfo.badgeColor }}
            title="Cambiar rol de usuario"
          >
            <span>👤</span>
            <span>{roleInfo.label}</span>
          </button>

          {/* Dark/light toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300"
            style={{ borderColor: "#1DBECB", color: "var(--t-text)" }}
            aria-label="Cambiar modo"
            title={darkMode ? "Modo claro" : "Modo oscuro"}
          >
            {darkMode ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1DBECB" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#7209B7" stroke="#7209B7" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <LangSelector />

          <button
            className="lg:hidden text-lg px-2 py-1 font-bold"
            style={{ color: "var(--t-text)" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Menú responsive */}
      {menuOpen && (
        <div
          className="lg:hidden border-t px-4 py-3 flex flex-col gap-2 transition-colors duration-300 max-h-[85vh] overflow-y-auto"
          style={{ background: "var(--t-nav-bg)", borderTopColor: "rgba(114,9,183,0.3)" }}
        >
          <div className="flex items-center justify-between py-1.5 px-3 mb-1 bg-white/5 rounded-lg border border-white/10">
            <span className="text-xs text-[#FFFFFF]/60">Rol actual:</span>
            <button
              onClick={() => {
                navigate("login");
                setMenuOpen(false);
              }}
              className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
              style={{ background: roleInfo.badgeBg }}
            >
              {roleInfo.label} ✎
            </button>
          </div>
          {links.map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                setActiveSection(key);
                setMenuOpen(false);
              }}
              className="text-left px-3 py-2 rounded text-sm font-semibold transition-colors"
              style={{
                background: activeSection === key ? "#7209B7" : "transparent",
                color: activeSection === key ? "#FFFFFF" : "var(--t-text)",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
