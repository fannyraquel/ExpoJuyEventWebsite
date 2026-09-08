import { Section } from "@appTypes/domain.types";
import { useNavigation } from "@context/NavigationContext";
import AguayoDivider from "@components/common/AguayoDivider";
import { SITE_CONFIG } from "@config/site.config";

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

  return (
    <footer className="relative z-20 w-full overflow-hidden bg-[#0B0F17] text-white border-t border-white/10 shadow-2xl transition-colors duration-300">
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
                <span className="text-white">JUY</span>
              </div>
              <span className="rounded-full bg-[#1DBECB]/20 border border-[#1DBECB]/40 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-[#1DBECB]">
                {SITE_CONFIG.edition}
              </span>
            </div>

            <p className="text-xs font-normal leading-relaxed text-slate-300/80 max-w-sm">
              La feria internacional más importante del Noroeste Argentino. Muestra de la matriz productiva, minera, agroindustrial, turística y biotecnológica de Jujuy.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-300">
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
                <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-[#1DBECB]">
                  {col.title}
                </h4>
                <ul className="space-y-2.5 text-xs font-medium">
                  {col.links.map(([key, label]) => (
                    <li key={key}>
                      <button
                        type="button"
                        onClick={() => setActiveSection(key)}
                        className="group flex items-center gap-1.5 text-slate-300 transition-all hover:text-[#1DBECB] hover:translate-x-1 cursor-pointer text-left"
                      >
                        <span className="text-[10px] text-[#7209B7] opacity-0 group-hover:opacity-100 transition-opacity">
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
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#1DBECB]">
              Organizan
            </h4>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                Entidad Organizadora
              </span>
              <p className="text-xs font-bold text-white leading-snug">
                Cámara de Comercio Exterior de Jujuy &amp; Gobierno de Jujuy
              </p>
            </div>

            {/* Redes Sociales / Contacto */}
            <div className="pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Conectate con ExpoJuy
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white transition-all hover:bg-[#7209B7] hover:scale-110"
                  title="Instagram"
                >
                  📷
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white transition-all hover:bg-[#1DBECB] hover:scale-110"
                  title="Facebook"
                >
                  🌐
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white transition-all hover:bg-[#0077B5] hover:scale-110"
                  title="LinkedIn"
                >
                  💼
                </a>
                <a
                  href="mailto:contacto@expojuy.gob.ar"
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white transition-all hover:bg-[#7209B7] hover:scale-110"
                  title="Correo Oficial"
                >
                  ✉️
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pie Inferior de Derechos y Términos */}
      <div className="border-t border-white/10 bg-black/40 py-5">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>© 2026 ExpoJuy. Todos los derechos reservados.</span>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-slate-400">
            <button
              type="button"
              onClick={() => setActiveSection("sobre")}
              className="hover:text-[#1DBECB] transition-colors cursor-pointer"
            >
              Términos
            </button>
            <button
              type="button"
              onClick={() => setActiveSection("sobre")}
              className="hover:text-[#1DBECB] transition-colors cursor-pointer"
            >
              Privacidad
            </button>
            <button
              type="button"
              onClick={() => setActiveSection("faq")}
              className="hover:text-[#1DBECB] transition-colors cursor-pointer"
            >
              FAQ / Accesibilidad
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
