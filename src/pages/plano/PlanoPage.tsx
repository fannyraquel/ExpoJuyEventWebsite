import { useState, useEffect } from "react";
import AguayoDivider from "../../components/common/AguayoDivider";
import InteractiveMap from "../../components/features/InteractiveMap";
import { standsService } from "../../api/services/standsService";
import { Stand } from "../../types/domain.types";
import RegistroExpositorForm from "../../forms/expositores/RegistroExpositorForm";

export default function PlanoPage() {
  const [stands, setStands] = useState<Stand[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [selectedCat, setSelectedCat] = useState("Todos");
  const [showRegistroModal, setShowRegistroModal] = useState(false);

  useEffect(() => {
    standsService.getStands().then((res) => {
      if (res.success && res.data) {
        setStands(res.data);
      }
    });
  }, []);

  const cats = ["Todos", ...Array.from(new Set(stands.map((s) => s.categoria)))];

  return (
    <div className="pt-14" style={{ background: "var(--t-bg)", color: "var(--t-text)" }}>
      <div className="bg-[#1DBECB] py-14 px-4 text-center">
        <div className="font-mono-data text-white/70 text-xs uppercase tracking-widest mb-3">Plano interactivo</div>
        <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-4">Mapa del predio</h1>
        <p className="text-white/70 mb-4">Encontrá tu stand, filtrá por categoría y conocé el estado de cada espacio.</p>
        <button
          onClick={() => setShowRegistroModal(!showRegistroModal)}
          className="bg-[#7209B7] hover:bg-[#4D0080] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-md transition-colors"
        >
          {showRegistroModal ? "Ocultar Registro" : "Solicitar Stand / Registro Expositores"}
        </button>
      </div>
      <AguayoDivider />

      <div className="max-w-5xl mx-auto px-4 py-10">
        {showRegistroModal && (
          <div className="mb-8">
            <RegistroExpositorForm />
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar empresa o stand..."
            className="flex-1 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#1DBECB] border transition-colors"
            style={{
              background: "var(--t-input-bg)",
              borderColor: "var(--t-input-border)",
              color: "var(--t-text)",
            }}
          />
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCat(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selectedCat === c ? "bg-[#1DBECB] text-white border-[#1DBECB]" : ""
                }`}
                style={{
                  background: selectedCat === c ? "#1DBECB" : "var(--t-card)",
                  borderColor: selectedCat === c ? "#1DBECB" : "var(--t-card-border)",
                  color: selectedCat === c ? "#FFFFFF" : "var(--t-text)",
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <InteractiveMap stands={stands} busqueda={busqueda} selectedCat={selectedCat} />
      </div>
    </div>
  );
}
