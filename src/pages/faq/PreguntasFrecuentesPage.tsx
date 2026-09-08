import { useState } from "react";
import AguayoDivider from "../../components/common/AguayoDivider";

const faqs = [
  {
    question: "¿Cuándo y dónde se realiza ExpoJuy 2026?",
    answer:
      "La edición 2026 se realizará del 12 al 15 de octubre en el Predio Ferial de San Salvador de Jujuy, Argentina.",
  },
  {
    question: "¿Cómo puedo participar como expositor?",
    answer:
      "Podés completar el formulario de preinscripción desde el apartado de expositores o contactarte con la organización para reservar tu stand y completar la documentación requerida.",
  },
  {
    question: "¿La entrada es gratuita?",
    answer:
      "La visita al predio es abierta al público general y puede contar con acceso libre o con inscripción previa según cada actividad y jornada.",
  },
  {
    question: "¿Hay agenda de actividades para público general?",
    answer:
      "Sí. La agenda incluye jornadas institucionales, negocios, talleres, ruedas de inversión, encuentro cultural y actividades para visitantes.",
  },
  {
    question: "¿Puedo reservar reuniones de negocio?",
    answer:
      "Sí. El programa contempla rondas de negocios y encuentros B2B para conectar empresas, inversores y proveedores dentro de la feria.",
  },
];

export default function PreguntasFrecuentesPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="relative z-10 pt-14" style={{ background: "transparent", color: "var(--t-text)" }}>
      <div className="bg-[#1A1A2E]/78 py-16 px-4 text-center backdrop-blur-sm">
        <div className="font-mono-data text-[#1DBECB] text-xs uppercase tracking-widest mb-3">Centro de ayuda</div>
        <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-3">Preguntas frecuentes</h1>
        <p className="text-white/70 max-w-2xl mx-auto">
          Todo lo que necesitás saber antes, durante y después de ExpoJuy 2026.
        </p>
      </div>
      <AguayoDivider />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-[1.4fr_0.8fr] gap-8">
          <div className="space-y-3">
            {faqs.map((item, index) => {
              const isOpen = index === openIndex;

              return (
                <div
                  key={item.question}
                  className="rounded-2xl border transition-all"
                  style={{
                    background: "var(--t-card)",
                    borderColor: isOpen ? "#1DBECB" : "var(--t-card-border)",
                    boxShadow: isOpen ? "0 12px 30px rgba(29,190,203,0.08)" : "none",
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-display text-base md:text-lg font-bold">{item.question}</span>
                    <span className="text-2xl font-light" style={{ color: "#7209B7" }}>
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "var(--t-text-muted)" }}>
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <aside className="space-y-5">
            <div className="rounded-2xl p-6 border" style={{ background: "var(--t-surface)", borderColor: "var(--t-card-border)" }}>
              <div className="font-mono-data text-xs uppercase tracking-widest mb-3" style={{ color: "var(--t-text-muted)" }}>
                Necesitás ayuda
              </div>
              <h2 className="font-display text-2xl font-black mb-3">Contactanos</h2>
              <p className="text-sm mb-4" style={{ color: "var(--t-text-muted)" }}>
                Nuestro equipo responde consultas de prensa, expositores, visitantes y patrocinantes.
              </p>
              <div className="space-y-2 text-sm">
                <p>📧 info@expojuy.gob.ar</p>
                <p>📞 +54 388 422-XXXX</p>
                <p>📍 Predio Ferial, San Salvador de Jujuy</p>
              </div>
            </div>

            <div className="rounded-2xl p-6 border" style={{ background: "var(--t-card)", borderColor: "var(--t-card-border)" }}>
              <div className="font-mono-data text-xs uppercase tracking-widest mb-3" style={{ color: "var(--t-text-muted)" }}>
                Redes sociales
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Instagram",
                  "Facebook",
                  "YouTube",
                  "LinkedIn",
                ].map((social) => (
                  <span
                    key={social}
                    className="inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold"
                    style={{ borderColor: "var(--t-card-border)", color: "var(--t-text)" }}
                  >
                    {social}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
