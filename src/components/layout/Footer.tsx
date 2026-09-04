import { Section } from "../../types/domain.types";
import { useNavigation } from "../../context/NavigationContext";
import AguayoDivider from "../common/AguayoDivider";
import { SITE_CONFIG } from "../../config/site.config";

export default function Footer() {
  const { setActiveSection } = useNavigation();

  return (
    <footer className="text-[#FFFFFF]" style={{ background: "var(--t-footer-bg)" }}>
      <AguayoDivider />
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <div className="font-display text-2xl font-black mb-2">
            <span className="text-[#7209B7]">EXPO</span>JUY<span className="text-[#1DBECB] text-sm ml-1">{SITE_CONFIG.edition}</span>
          </div>
          <p className="text-[#FFFFFF]/50 text-sm">{SITE_CONFIG.dates} · {SITE_CONFIG.location}</p>
        </div>
        {[
          {
            title: "Secciones",
            links: [
              ["inicio", "Inicio"],
              ["explorar", "Explorar"],
              ["agenda", "Agenda"],
              ["negocios", "Ronda de Negocios"],
            ] as [Section, string][],
          },
          {
            title: "Territorio",
            links: [
              ["descubrí", "Descubrí Jujuy"],
              ["plano", "Plano interactivo"],
              ["bioceánico", "Corredor Bioceánico"],
              ["data", "ExpoJuy DATA"],
            ] as [Section, string][],
          },
          {
            title: "Institucional & Roles",
            links: [
              ["noticias", "Noticias"],
              ["sobre", "Sobre ExpoJuy"],
              ["admin", "Panel Admin"],
              ["login", "Perfil / Roles"],
            ] as [Section, string][],
          },
        ].map((col) => (
          <div key={col.title}>
            <div className="font-semibold text-xs uppercase tracking-widest text-[#FFFFFF]/40 mb-3">{col.title}</div>
            <ul className="space-y-2">
              {col.links.map(([key, label]) => (
                <li key={key}>
                  <button
                    onClick={() => setActiveSection(key)}
                    className="text-[#FFFFFF]/70 hover:text-[#1DBECB] text-sm transition-colors text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[#FFFFFF]/30">
        <span>© 2026 ExpoJuy. Todos los derechos reservados.</span>
        <span className="flex gap-4">
          <span className="hover:text-[#1DBECB] cursor-pointer transition-colors">Términos</span>
          <span className="hover:text-[#1DBECB] cursor-pointer transition-colors">Privacidad</span>
          <span className="hover:text-[#1DBECB] cursor-pointer transition-colors">Accesibilidad</span>
        </span>
      </div>
    </footer>
  );
}
