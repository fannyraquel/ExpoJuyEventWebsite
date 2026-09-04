import AguayoDivider from "../../components/common/AguayoDivider";
import { SITE_CONFIG } from "../../config/site.config";
import ContactoForm from "../../forms/contacto/ContactoForm";

export default function SobrePage() {
  return (
    <div className="pt-14" style={{ background: "var(--t-bg)", color: "var(--t-text)" }}>
      <div className="bg-[#1A1A2E] py-20 px-4 text-center">
        <div className="font-mono-data text-[#1DBECB] text-xs uppercase tracking-widest mb-4">Sobre ExpoJuy</div>
        <h1 className="font-display text-5xl md:text-6xl font-black text-white mb-4">Historia &amp; Misión</h1>
        <p className="text-[#FFFFFF]/70 max-w-2xl mx-auto text-lg">
          Desde 2014, ExpoJuy conecta a Jujuy con el mundo, siendo el principal evento comercial del Noroeste Argentino.
        </p>
      </div>
      <AguayoDivider />
      <div className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-2xl font-bold mb-4" style={{ color: "var(--t-text)" }}>
            Historia y ediciones
          </h2>
          <div className="space-y-4 mb-8">
            {[
              ["2014", "Primera edición: 80 expositores, foco local"],
              ["2016", "Apertura regional: NOA + Bolivia"],
              ["2018", "Primera delegación internacional de Brasil"],
              ["2020", "Edición virtual: 6.000 participantes online"],
              ["2022", "Récord: 240 expositores, 15 países"],
              ["2024", "ExpoJuy en el mapa del Corredor Bioceánico"],
              ["2026", "Edición de la integración: 312 expositores, 23 países"],
            ].map(([year, desc]) => (
              <div key={year} className="flex gap-4">
                <div className="font-mono-data text-[#7209B7] font-bold text-sm min-w-[3rem]">{year}</div>
                <div className="text-sm border-l-2 border-[#1DBECB]/30 pl-4" style={{ color: "var(--t-text-muted)" }}>
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="font-display text-2xl font-bold mb-4" style={{ color: "var(--t-text)" }}>
              Lema 2026
            </h2>
            <div className="bg-[#7209B7] text-white p-6 rounded-xl shadow-md mb-4">
              <div className="font-display text-2xl italic font-bold">"{SITE_CONFIG.lema}"</div>
            </div>
            <p className="text-sm" style={{ color: "var(--t-text-muted)" }}>
              ExpoJuy 2026 apuesta a la integración regional como motor del desarrollo productivo.
            </p>
          </div>

          <ContactoForm />
        </div>
      </div>
    </div>
  );
}
