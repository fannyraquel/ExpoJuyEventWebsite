import AguayoDivider from "../../components/common/AguayoDivider";
import ContactoForm from "../../forms/contacto/ContactoForm";
import { SITE_CONFIG } from "../../config/site.config";

const contactMethods = [
  { label: "Email institucional", value: SITE_CONFIG.contact.email, icon: "✉️" },
  { label: "Teléfono", value: SITE_CONFIG.contact.phone, icon: "📞" },
  { label: "Ubicación", value: SITE_CONFIG.contact.address, icon: "📍" },
  { label: "Sitio web", value: SITE_CONFIG.contact.website, icon: "🌐" },
];

export default function ContactoPage() {
  return (
    <div className="relative z-10 pt-14" style={{ background: "transparent", color: "var(--t-text)" }}>
      <div className="bg-[#1DBECB]/75 py-16 px-4 text-center backdrop-blur-sm">
        <div className="font-mono-data text-white/70 text-xs uppercase tracking-widest mb-3">Contacto</div>
        <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-3">Estamos para ayudarte</h1>
        <p className="text-white/80 max-w-2xl mx-auto">
          Consultas institucionales, prensa, expositores, patrocinantes y visitantes.
        </p>
      </div>
      <AguayoDivider />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
          <div className="space-y-4">
            {contactMethods.map((method) => (
              <div
                key={method.label}
                className="rounded-2xl p-5 border"
                style={{
                  background: "var(--t-card)",
                  borderColor: "var(--t-card-border)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7209B7]/10 text-lg">
                    {method.icon}
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest" style={{ color: "var(--t-text-muted)" }}>
                      {method.label}
                    </div>
                    <div className="font-display text-lg font-bold">{method.value}</div>
                  </div>
                </div>
              </div>
            ))}

            <div className="rounded-2xl p-5 border" style={{ background: "var(--t-surface)", borderColor: "var(--t-card-border)" }}>
              <div className="font-mono-data text-xs uppercase tracking-widest mb-2" style={{ color: "var(--t-text-muted)" }}>
                Horarios
              </div>
              <p className="text-sm" style={{ color: "var(--t-text-muted)" }}>
                Lunes a viernes · 9:00 a 18:00 hs.<br />
                En evento: atención presencial desde apertura del predio.
              </p>
            </div>
          </div>

          <ContactoForm />
        </div>
      </div>
    </div>
  );
}
