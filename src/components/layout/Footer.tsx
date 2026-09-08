import { Section } from "@appTypes/domain.types";
import { useNavigation } from "@context/NavigationContext";
import AguayoDivider from "@components/common/AguayoDivider";
import { SITE_CONFIG } from "@config/site.config";

import facebookIcon from "@assets/icons/facebook.png";
import instagramIcon from "@assets/icons/instagram.png";
import linkedinIcon from "@assets/icons/linkedin.png";
import tiktokIcon from "@assets/icons/tiktok.png";
import youtubeIcon from "@assets/icons/youtube.png";
import emailIcon from "@assets/icons/email.png";

export default function Footer() {
  const { setActiveSection } = useNavigation();

  const navColumns = [
    {
      title: "Secciones",
      links: [
        ["inicio", "Inicio"],
        ["explorar", "Explorar Expositores"],
        ["agenda", "Agenda de Actividades"],
        ["negocios", "Ronda de Negocios B2B"],
      ] as [Section, string][],
    },
    {
      title: "Territorio & Plano",
      links: [
        ["descubrí", "Descubrí Jujuy"],
        ["plano", "Plano Interactivo"],
        ["bioceánico", "Corredor Bioceánico"],
        ["data", "ExpoJuy DATA"],
      ] as [Section, string][],
    },
    {
      title: "Institucional",
      links: [
        ["noticias", "Novedades & Noticias"],
        ["sobre", "Sobre la ExpoJuy"],
        ["admin", "Panel Admin"],
        ["login", "Acceso Expositores"],
      ] as [Section, string][],
    },
  ];

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: instagramIcon,
    },
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: facebookIcon,
    },
    {
      name: "TikTok",
      href: "https://tiktok.com",
      icon: tiktokIcon,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: linkedinIcon,
    },
    {
      name: "YouTube",
      href: "https://youtube.com",
      icon: youtubeIcon,
    },
    {
      name: "Correo Oficial",
      href: "mailto:contacto@expojuy.gob.ar",
      icon: emailIcon,
    },
  ];

  return (
    <footer
      className="relative z-20 w-full overflow-hidden border-t shadow-2xl transition-colors duration-300"
      style={{
        background: "var(--t-footer-bg)",
        borderColor: "var(--t-card-border)",
        color: "var(--t-text)",
      }}
    >
      {/* Guarda Andina / Divisor Tradicional */}
      <AguayoDivider />

      {/* Contenido Principal en Grid */}
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Columna 1: Branding y Datos Principales (4 cols) */}
          <div className="space-y-4 md:col-span-4">
            <div className="flex items-center gap-2">
              <div className="font-display text-3xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-[#7209B7] via-[#9D4EDD] to-[#1DBECB] bg-clip-text text-transparent">
                  EXPO
                </span>
                <span className="text-slate-900 dark:text-white">JUY</span>
              </div>
              <span className="rounded-full bg-[#1DBECB]/15 border border-[#1DBECB]/30 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-[#0e8a95] dark:text-[#1DBECB]">
                {SITE_CONFIG.edition}
              </span>
            </div>

            <p className="text-xs font-normal leading-relaxed text-[var(--t-text-muted)] max-w-sm">
              La feria internacional más importante del Noroeste Argentino. Muestra de la matriz productiva, minera, agroindustrial, turística y biotecnológica de Jujuy.
            </p>

            <div className="space-y-2 pt-2 text-xs text-[var(--t-text-muted)] font-medium">
              <div className="flex items-center gap-2">
                <span className="text-[#1DBECB]">📍</span>
                <span>{SITE_CONFIG.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#7209B7] dark:text-[#A881FC]">📅</span>
                <span>{SITE_CONFIG.dates}</span>
              </div>
            </div>
          </div>

          {/* Columnas 2, 3, 4: Enlaces de Navegación (5 cols) */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:col-span-5">
            {navColumns.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#7209B7] dark:text-[#1DBECB]">
                  {col.title}
                </h4>
                <ul className="space-y-2.5 text-xs font-medium">
                  {col.links.map(([key, label]) => (
                    <li key={key}>
                      <button
                        type="button"
                        onClick={() => setActiveSection(key)}
                        className="group flex items-center gap-1.5 text-[var(--t-text-muted)] transition-all hover:text-[#7209B7] dark:hover:text-[#1DBECB] hover:translate-x-1 cursor-pointer text-left font-semibold"
                      >
                        <span className="text-[10px] text-[#7209B7] dark:text-[#1DBECB] opacity-0 group-hover:opacity-100 transition-opacity">
                          ›
                        </span>
                        <span>{label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Columna 5: Organización & Redes (3 cols) */}
          <div className="space-y-4 md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#7209B7] dark:text-[#1DBECB]">
              Organizan
            </h4>
            <div className="rounded-2xl border border-[var(--t-card-border)] bg-[var(--t-surface)] dark:bg-white/5 p-4 backdrop-blur-md space-y-1.5 shadow-sm">
              <span className="text-[10px] font-mono text-[var(--t-text-muted)] uppercase tracking-wider block font-bold">
                Entidad Organizadora
              </span>
              <p className="text-xs font-bold text-[var(--t-text)] leading-snug">
                Cámara de Comercio Exterior de Jujuy &amp; Gobierno de Jujuy
              </p>
            </div>

            {/* Redes Sociales / Contacto */}
            <div className="pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--t-text-muted)] block mb-2.5">
                Conectate con ExpoJuy
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-200/80 dark:bg-white/10 p-2 text-white border border-slate-300/60 dark:border-white/15 transition-all duration-300 hover:scale-110 hover:bg-slate-300 dark:hover:bg-white/20 hover:border-slate-400 dark:hover:border-white/30 shadow-sm"
                    title={item.name}
                  >
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="h-full w-full object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pie Inferior de Derechos y Términos */}
      <div className="border-t border-[var(--t-card-border)] bg-slate-200/50 dark:bg-black/40 py-5">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[var(--t-text-muted)]">
          <div className="flex items-center gap-2 font-medium">
            <span>© 2026 ExpoJuy. Todos los derechos reservados.</span>
          </div>

          <div className="flex flex-wrap items-center gap-5 font-semibold">
            <button
              type="button"
              onClick={() => setActiveSection("sobre")}
              className="hover:text-[#7209B7] dark:hover:text-[#1DBECB] transition-colors cursor-pointer"
            >
              Términos
            </button>
            <button
              type="button"
              onClick={() => setActiveSection("sobre")}
              className="hover:text-[#7209B7] dark:hover:text-[#1DBECB] transition-colors cursor-pointer"
            >
              Privacidad
            </button>
            <button
              type="button"
              onClick={() => setActiveSection("faq")}
              className="hover:text-[#7209B7] dark:hover:text-[#1DBECB] transition-colors cursor-pointer"
            >
              FAQ / Accesibilidad
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
