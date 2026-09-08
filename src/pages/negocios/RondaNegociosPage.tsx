import React, { useState, useEffect } from "react";
import AguayoDivider from "../../components/common/AguayoDivider";
import { empresasService } from "../../api/services/empresasService";
import { Empresa } from "../../types/domain.types";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "../../context/NavigationContext";
import {
  RondaNegociosHeader,
  RondaNegociosStats,
  RondaNegociosGrid,
} from "../../components/negocios";

export default function RondaNegociosPage() {
  const { queryParams } = useNavigation();
  const { role } = useAuth();
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [expanded, setExpanded] = useState<string | null>(queryParams.empresa || null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    empresasService
      .getEmpresas()
      .then((res) => {
        if (isMounted && res.success && res.data) {
          setEmpresas(res.data);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleInscribirseClick = () => {
    if (empresas.length > 0) {
      setExpanded(empresas[0].nombre);
      // Smooth scroll down to grid
      const gridElement = document.getElementById("ronda-grid");
      if (gridElement) {
        gridElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div
      className="relative z-10 pt-14 min-h-screen flex flex-col justify-between"
      style={{ background: "transparent", color: "var(--t-text)" }}
    >
      <div>
        {/* 1. HERO HEADER INTERNACIONAL */}
        <RondaNegociosHeader onInscribirse={handleInscribirseClick} />

        <AguayoDivider />

        {/* 2. ESTADÍSTICAS Y MÉTRICAS B2B */}
        <RondaNegociosStats />

        {/* 3. DIRECTORIO B2B Y EXPOSITORES CON FILTROS Y FORMULARIO */}
        <div id="ronda-grid">
          {loading ? (
            <div className="py-20 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#1DBECB] border-r-transparent align-[-0.125em]" />
              <p className="mt-3 text-xs font-mono text-slate-400">
                Cargando directorio B2B y expositores...
              </p>
            </div>
          ) : (
            <RondaNegociosGrid
              empresas={empresas}
              expandedEmpresa={expanded}
              onToggleExpand={(nombre) => setExpanded(nombre || null)}
              userRole={role}
            />
          )}
        </div>
      </div>
    </div>
  );
}
