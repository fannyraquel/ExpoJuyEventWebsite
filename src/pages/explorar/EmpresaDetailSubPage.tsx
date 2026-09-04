import { Empresa } from "../../types/domain.types";
import { useNavigation } from "../../context/NavigationContext";
import SolicitudB2BForm from "../../forms/b2b/SolicitudB2BForm";

interface EmpresaDetailSubPageProps {
  empresa: Empresa;
}

export default function EmpresaDetailSubPage({ empresa }: EmpresaDetailSubPageProps) {
  const { navigate } = useNavigation();

  return (
    <div className="pt-14 max-w-4xl mx-auto px-4 py-12">
      <button onClick={() => navigate("explorar")} className="text-xs text-[#1DBECB] font-bold mb-4 hover:underline">
        ← Volver a Explorar Expositores
      </button>

      <div className="bg-white dark:bg-[#23233E] rounded-2xl p-8 border border-[#F0F0F5] dark:border-white/10 shadow-md mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">{empresa.pais}</span>
          <div>
            <h1 className="font-display text-3xl font-bold text-[#4A4A4A] dark:text-white">{empresa.nombre}</h1>
            <span className="text-xs font-semibold text-[#7209B7] uppercase">{empresa.rubro} · Región {empresa.region}</span>
          </div>
        </div>
        <div className="text-sm text-[#4A4A4A]/70 dark:text-white/70">
          <strong>Objetivo en ExpoJuy 2026:</strong> Busca <span>{empresa.busca}</span>.
        </div>
      </div>

      <SolicitudB2BForm empresaNombre={empresa.nombre} />
    </div>
  );
}
