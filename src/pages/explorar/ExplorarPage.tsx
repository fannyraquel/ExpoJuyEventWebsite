import { useState, useEffect } from "react";
import AguayoDivider from "../../components/common/AguayoDivider";
import { empresasService } from "../../api/services/empresasService";
import { Empresa } from "../../types/domain.types";
import { CAT_COLORS } from "../../config/theme.config";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "../../context/NavigationContext";

export default function ExplorarPage() {
  const { navigate } = useNavigation();
  const { checkPermission } = useAuth();
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [filtroRubro, setFiltroRubro] = useState("Todos");
  const [filtroBusca, setFiltroBusca] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    empresasService.getEmpresas(filtroRubro, filtroBusca).then((res) => {
      if (res.success && res.data) {
        setEmpresas(res.data);
      }
    });
  }, [filtroRubro, filtroBusca]);

  const rubros = ["Todos", "Minería", "Agroindustria", "Turismo", "Biodiversidad", "Industria", "Textil"];
  const busca = ["Todos", "Inversor", "Distribuidor", "Socio comercial", "Mercado externo", "Exportar"];

  const filtered = empresas.filter((e) => {
    const matchSearch =
      !busqueda ||
      e.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.rubro.toLowerCase().includes(busqueda.toLowerCase());
    return matchSearch;
  });

  return (
    <div className="pt-14">
      <div className="bg-[#7209B7] py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="font-mono-data text-white/70 text-xs uppercase tracking-widest mb-3">Explorar ExpoJuy</div>
          <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-4">Empresas &amp; Expositores</h1>
          <div className="flex gap-2">
            <input
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar por nombre, rubro o CUIT..."
              className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white text-sm"
            />
            <button className="bg-[#1A1A2E] text-white px-5 py-3 rounded-lg font-semibold text-sm hover:bg-black transition-colors">
              Buscar
            </button>
          </div>
        </div>
      </div>
      <AguayoDivider />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-[#4A4A4A]/50 uppercase">Rubro:</span>
            {rubros.map((r) => (
              <button
                key={r}
                onClick={() => setFiltroRubro(r)}
                className="px-3 py-1 rounded-full text-xs font-semibold border transition-all"
                style={
                  filtroRubro === r
                    ? { background: "#7209B7", color: "#FFFFFF", borderColor: "#7209B7" }
                    : { background: "var(--t-surface)", color: "var(--t-text)", borderColor: "var(--t-card-border)" }
                }
              >
                {r}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold uppercase" style={{ color: "var(--t-text-muted)" }}>
              Busca:
            </span>
            {busca.map((b) => (
              <button
                key={b}
                onClick={() => setFiltroBusca(b)}
                className="px-3 py-1 rounded-full text-xs font-semibold border transition-all"
                style={
                  filtroBusca === b
                    ? { background: "#0891B2", color: "#FFFFFF", borderColor: "#0891B2" }
                    : { background: "var(--t-surface)", color: "var(--t-text)", borderColor: "var(--t-card-border)" }
                }
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((e) => (
            <div
              key={e.nombre}
              className="rounded-xl p-5 hover:shadow-md transition-all group"
              style={{ background: "var(--t-card)", border: "1px solid var(--t-card-border)" }}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                  style={{ background: (CAT_COLORS[e.rubro] || "#7209B7") + "20" }}
                >
                  {e.pais}
                </div>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: "var(--t-surface)", color: "var(--t-text)", border: "1px solid var(--t-card-border)" }}
                >
                  {e.region}
                </span>
              </div>
              <h3 className="font-display font-bold mb-1 leading-snug" style={{ color: "var(--t-text)" }}>
                {e.nombre}
              </h3>
              <div className="text-xs mb-3" style={{ color: "var(--t-text-muted)" }}>
                {e.rubro}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold" style={{ color: CAT_COLORS[e.rubro] || "#7209B7" }}>
                  Busca: {e.busca}
                </span>
                <button
                  onClick={() => navigate("negocios", { empresa: e.nombre })}
                  className="text-xs text-[#1DBECB] font-bold opacity-80 group-hover:opacity-100 transition-opacity hover:underline"
                >
                  {checkPermission("connect_b2b") ? "Conectar →" : "Ver B2B →"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#4A4A4A]/40 dark:text-white/40 font-display text-xl">
            No se encontraron empresas con esos filtros.
          </div>
        )}
      </div>
    </div>
  );
}
