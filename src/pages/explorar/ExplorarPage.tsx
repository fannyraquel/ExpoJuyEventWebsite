import { useState, useEffect } from "react";
import AguayoDivider from "@components/common/AguayoDivider";
import { empresasService, EmpresaFilterMetadata } from "@api/services/empresasService";
import { Empresa } from "@appTypes/domain.types";
import { useAuth } from "@context/AuthContext";
import { useNavigation } from "@context/NavigationContext";
import {
  ExplorarHeader,
  ExplorarFilters,
  ExplorarGrid,
} from "@components/explorar";

export default function ExplorarPage() {
  const { navigate } = useNavigation();
  const { checkPermission } = useAuth();

  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [metadata, setMetadata] = useState<EmpresaFilterMetadata>({
    rubros: [],
    buscaOptions: [],
    regiones: [],
  });

  const [filtroRubro, setFiltroRubro] = useState("Todos");
  const [filtroBusca, setFiltroBusca] = useState("Todos");
  const [filtroRegion, setFiltroRegion] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(false);

  // Cargar metadata dinámica de filtros (categorías y contadores) preparada para BD
  useEffect(() => {
    empresasService.getFilterMetadata().then((res) => {
      if (res.success && res.data) {
        setMetadata(res.data);
      }
    });
  }, []);

  // Cargar lista de empresas aplicando los filtros asíncronos
  useEffect(() => {
    setCargando(true);
    empresasService
      .getEmpresas({
        rubro: filtroRubro,
        busca: filtroBusca,
        region: filtroRegion,
        busqueda: busqueda,
      })
      .then((res) => {
        if (res.success && res.data) {
          setEmpresas(res.data);
        }
      })
      .finally(() => setCargando(false));
  }, [filtroRubro, filtroBusca, filtroRegion, busqueda]);

  const handleLimpiarFiltros = () => {
    setFiltroRubro("Todos");
    setFiltroBusca("Todos");
    setFiltroRegion("Todos");
    setBusqueda("");
  };

  const handleConectar = (empresaNombre: string) => {
    navigate("negocios", { empresa: empresaNombre });
  };

  const canConnectB2B = checkPermission("connect_b2b");

  return (
    <div className="relative z-10 pt-14 min-h-screen font-sans bg-[var(--t-bg)] text-[var(--t-text)] transition-colors duration-300">
      {/* Encabezado y Buscador Principal */}
      <ExplorarHeader
        busqueda={busqueda}
        onSearchChange={setBusqueda}
        onSearchSubmit={() => setBusqueda((val) => val.trim())}
      />

      <AguayoDivider />

      {/* Contenido Principal */}
      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* Barra de Filtros Dinámicos (Preparados para BD con contadores) */}
        <ExplorarFilters
          rubros={metadata.rubros}
          filtroRubro={filtroRubro}
          onSelectRubro={setFiltroRubro}
          buscaOptions={metadata.buscaOptions}
          filtroBusca={filtroBusca}
          onSelectBusca={setFiltroBusca}
          regionesOptions={metadata.regiones}
          filtroRegion={filtroRegion}
          onSelectRegion={setFiltroRegion}
          onLimpiarFiltros={handleLimpiarFiltros}
          cargando={cargando}
        />

        {/* Grid de Tarjetas Visuales de Empresas */}
        <ExplorarGrid
          empresas={empresas}
          onConectar={handleConectar}
          canConnectB2B={canConnectB2B}
        />
      </main>
    </div>
  );
}
