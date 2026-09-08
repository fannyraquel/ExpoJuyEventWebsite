import { Sponsor, SponsorTier } from "@appTypes/sponsor.types";
import logoCamComExt from "@assets/EXPOJUY_Logo2026/logo_camcomext.png";

/**
 * Mock array de Sponsors obtenido por defecto desde backend.
 * Organizado por categorías exactas según el esquema de patrocinantes ExpoJuy 2026.
 */
const MOCK_SPONSORS: Sponsor[] = [
  // ---------------- DIAMANTE ----------------
  {
    id: "sp-macro",
    nombre: "Banco Macro",
    tier: "diamante",
    sitioWeb: "https://www.macro.com.ar",
    rubro: "Servicios Financieros & Banca Corporativa",
    descripcion: "Entidad bancaria nacional comprometida con la financiación y desarrollo de proyectos agroindustriales y mineros en Jujuy.",
    destacado: true,
    colorLogo: "#0033A0",
  },
  {
    id: "sp-dongcheng",
    nombre: "DongCheng",
    tier: "diamante",
    sitioWeb: "https://www.dongcheng-tools.com",
    rubro: "Herramientas Eléctricas & Maquinaria Industrial",
    descripcion: "Líder global en fabricación de herramientas industriales de alta exigencia para minería y construcción.",
    destacado: true,
    colorLogo: "#005BAC",
  },
  {
    id: "sp-camcomext",
    nombre: "Cámara de Comercio Exterior de Jujuy",
    tier: "diamante",
    logoUrl: logoCamComExt,
    sitioWeb: "https://www.camcomextjujuy.com.ar",
    rubro: "Entidad Co-Organizadora & Comercio Exterior",
    descripcion: "Institución gremial empresaria impulsora del comercio internacional, la muestra multisectorial ExpoJuy e integración regional del NOA.",
    destacado: true,
    colorLogo: "#005596",
  },

  // ---------------- PLATINO ----------------
  {
    id: "sp-sancorsalud",
    nombre: "SanCor Salud",
    tier: "platino",
    sitioWeb: "https://www.sancorsalud.com.ar",
    rubro: "Grupo de Medicina Privada",
    descripcion: "Cobertura médica integral de alcance nacional con atención prioritaria para empresas y parques industriales.",
    colorLogo: "#002F6C",
  },
  {
    id: "sp-comafi",
    nombre: "Banco Comafi",
    tier: "platino",
    sitioWeb: "https://www.comafi.com.ar",
    rubro: "Banca Empresarial & Leasing",
    descripcion: "Soluciones financieras a medida para PYMES, comercio exterior y bienes de capital.",
    colorLogo: "#00A859",
  },
  {
    id: "sp-rosatosa",
    nombre: "Rosato S.A.",
    tier: "platino",
    sitioWeb: "https://www.rosatosa.com.ar",
    rubro: "Fábrica de Máquinas & Equipos para la Industria",
    descripcion: "Maquinado in situ y soluciones electromecánicas para plantas industriales de gran porte.",
    colorLogo: "#C8102E",
  },

  // ---------------- ORO ----------------
  {
    id: "sp-papelera-rosato",
    nombre: "Papelera Rosato S.A.",
    tier: "oro",
    sitioWeb: "https://www.papelerarosato.com.ar",
    rubro: "Fábrica de Papel Tissue",
    descripcion: "Procesamiento y distribución masiva de productos de papel de alta calidad.",
    colorLogo: "#D9232D",
  },
  {
    id: "sp-parque-platanos",
    nombre: "Parque Industrial Plátanos",
    tier: "oro",
    sitioWeb: "https://www.parqueplatanos.com.ar",
    rubro: "Parque Industrial & Logística",
    descripcion: "Polo industrial y tecnológico con infraestructura estratégica para radicación de empresas.",
    colorLogo: "#FF6B00",
  },
  {
    id: "sp-maquinarias-independencia",
    nombre: "Maquinarias Independencia",
    tier: "oro",
    sitioWeb: "https://www.maquinariasindependencia.com.ar",
    rubro: "Venta & Alquiler de Maquinaria Vial",
    descripcion: "Equipamiento vial y pesado para infraestructura, minería y obras civiles.",
    colorLogo: "#DA291C",
  },

  // ---------------- PLATA ----------------
  {
    id: "sp-abin",
    nombre: "ABIN - Industria Naval",
    tier: "plata",
    sitioWeb: "https://www.industrianaval.org.ar",
    rubro: "Asociación Bonaerense de la Industria Naval",
    descripcion: "Cámara empresaria representativa del sector astillero, ingeniería marítima y transporte de carga.",
    colorLogo: "#004B87",
  },
  {
    id: "sp-miron",
    nombre: "Miron",
    tier: "plata",
    sitioWeb: "https://www.miron.com.ar",
    rubro: "Ingeniería & Soluciones de Corte",
    descripcion: "Maquinaria de alta precisión y herramientas de corte industrial de última generación.",
    colorLogo: "#111827",
  },
  {
    id: "sp-guadal",
    nombre: "Guadal",
    tier: "plata",
    sitioWeb: "https://www.guadal.com.ar",
    rubro: "Indumentaria de Trabajo & EPP",
    descripcion: "Confección y abastecimiento de indumentaria de alta protección y uniformes técnicos.",
    colorLogo: "#D32F2F",
  },

  // ---------------- BRONCE ----------------
  {
    id: "sp-serce",
    nombre: "Serce Global Solutions",
    tier: "bronce",
    sitioWeb: "https://www.serce.com.ar",
    rubro: "Global Solutions & Servicios Logísticos",
    colorLogo: "#DC2626",
  },
  {
    id: "sp-neuralsoft",
    nombre: "NeuralSoft",
    tier: "bronce",
    sitioWeb: "https://www.neuralsoft.com",
    rubro: "Software de Gestión ERP en la Nube",
    colorLogo: "#2563EB",
  },
  {
    id: "sp-cortadoras",
    nombre: "Cortadoras Argentinas",
    tier: "bronce",
    sitioWeb: "https://www.cortadorasargentinas.com",
    rubro: "Maquinaria para Construcción & Piedra",
    colorLogo: "#0284C7",
  },
  {
    id: "sp-fenix",
    nombre: "Fénix Aplicadores",
    tier: "bronce",
    sitioWeb: "https://www.fenixaplicadores.com.ar",
    rubro: "Pintura Técnica & Revestimientos Industriales",
    colorLogo: "#7C3AED",
  },
  {
    id: "sp-reparados",
    nombre: "Reparados",
    tier: "bronce",
    sitioWeb: "https://www.reparados.com.ar",
    rubro: "Smart Cleaning Tech",
    colorLogo: "#2563EB",
  },
  {
    id: "sp-odoo",
    nombre: "Odoo",
    tier: "bronce",
    sitioWeb: "https://www.odoo.com",
    rubro: "Suite de Aplicaciones Empresariales",
    colorLogo: "#714B67",
  },
  {
    id: "sp-witdata",
    nombre: "WitData",
    tier: "bronce",
    sitioWeb: "https://www.witdata.com.ar",
    rubro: "Infraestructura Cloud & Data Center",
    colorLogo: "#059669",
  },
  {
    id: "sp-tclsolar",
    nombre: "TCL Solar",
    tier: "bronce",
    sitioWeb: "https://www.tcl-solar.com",
    rubro: "Energía Fotovoltaica & Paneles Solares",
    colorLogo: "#DC2626",
  },
  {
    id: "sp-tecnimet",
    nombre: "Tecnimet",
    tier: "bronce",
    sitioWeb: "https://www.tecnimet.com.ar",
    rubro: "Construcción Modular & Estructuras",
    colorLogo: "#0284C7",
  },
  {
    id: "sp-triunfo",
    nombre: "Triunfo Seguros",
    tier: "bronce",
    sitioWeb: "https://www.triunfoseguros.com",
    rubro: "Aseguradora Patrimonial & Riesgos de Trabajo",
    colorLogo: "#059669",
  },
  {
    id: "sp-nunez",
    nombre: "Nuñez",
    tier: "bronce",
    sitioWeb: "https://www.nunez.com.ar",
    rubro: "Concesionario Oficial & Flotas",
    colorLogo: "#1E293B",
  },

  // ---------------- PYME ----------------
  {
    id: "sp-texor",
    nombre: "Texor",
    tier: "pyme",
    rubro: "Textil Industrial",
    colorLogo: "#DC2626",
  },
  {
    id: "sp-lusqtoff",
    nombre: "Lüsqtoff",
    tier: "pyme",
    sitioWeb: "https://www.lusqtoff.com.ar",
    rubro: "Fábrica de Generadores & Herramientas",
    colorLogo: "#EA580C",
  },
  {
    id: "sp-sabio",
    nombre: "Sabio Descartes",
    tier: "pyme",
    rubro: "Gestión Ambiental & Residuos",
    colorLogo: "#3B82F6",
  },
  {
    id: "sp-casamed",
    nombre: "Casamed",
    tier: "pyme",
    rubro: "Insumos Médicos & Salud",
    colorLogo: "#0284C7",
  },
  {
    id: "sp-strong",
    nombre: "Strong",
    tier: "pyme",
    rubro: "Seguridad Industrial & Calzado",
    colorLogo: "#1E293B",
  },
  {
    id: "sp-orbe",
    nombre: "Estudio Orbe",
    tier: "pyme",
    rubro: "Diseño & Arquitectura Comercial",
    colorLogo: "#D97706",
  },
  {
    id: "sp-wet",
    nombre: "WET",
    tier: "pyme",
    rubro: "Tratamiento de Agua & Eficiencia Hídrica",
    colorLogo: "#0284C7",
  },
  {
    id: "sp-crono",
    nombre: "Crono Lima",
    tier: "pyme",
    rubro: "Desarrollos Inmobiliarios",
    colorLogo: "#16A34A",
  },
  {
    id: "sp-apres",
    nombre: "Apres Salud",
    tier: "pyme",
    rubro: "Prestadora de Salud",
    colorLogo: "#0284C7",
  },
  {
    id: "sp-colombo",
    nombre: "Colombo PG",
    tier: "pyme",
    rubro: "Proyectos Gráficos & Señalética",
    colorLogo: "#DC2626",
  },
  {
    id: "sp-publios",
    nombre: "Publios",
    tier: "pyme",
    rubro: "Merchandising Corporativo",
    colorLogo: "#0284C7",
  },
  {
    id: "sp-langol",
    nombre: "Grupo Langol",
    tier: "pyme",
    rubro: "Servicios de Limpieza & Logística",
    colorLogo: "#0284C7",
  },
  {
    id: "sp-flock",
    nombre: "Flock",
    tier: "pyme",
    rubro: "Agencia Digital & Marketing",
    colorLogo: "#7C3AED",
  },
  {
    id: "sp-interbanking",
    nombre: "Interbanking",
    tier: "pyme",
    sitioWeb: "https://www.interbanking.com.ar",
    rubro: "Plataforma de Pagos Empresariales",
    colorLogo: "#9333EA",
  },
  {
    id: "sp-reyma",
    nombre: "Reyma Argentina S.A.",
    tier: "pyme",
    rubro: "Empaques & Descartables",
    colorLogo: "#CA8A04",
  },
  {
    id: "sp-aqa",
    nombre: "AQA®",
    tier: "pyme",
    rubro: "Grifería & Valvulería Industrial",
    colorLogo: "#111827",
  },

  // ---------------- MEDIA PARTNER ----------------
  {
    id: "sp-petroquimica",
    nombre: "Petroquímica",
    tier: "media_partner",
    sitioWeb: "https://www.petroquimica.com.ar",
    rubro: "Revista de Petróleo, Gas, Química & Energía",
    descripcion: "Medio especializado en la divulgación del sector energético e hidrocarburos.",
    colorLogo: "#111827",
  },
  {
    id: "sp-gremio",
    nombre: "Gremio Empresarial",
    tier: "media_partner",
    sitioWeb: "https://www.gremioempresarial.com.ar",
    rubro: "Portal de Noticias del Sector Productivo",
    descripcion: "Difusión de actividades corporativas, ferias e indicadores económicos regionales.",
    colorLogo: "#0284C7",
  },
];

export const sponsorsService = {
  /**
   * Obtiene la lista completa de sponsors (simula llamada asíncrona a la API del Backend).
   */
  async getSponsors(): Promise<Sponsor[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...MOCK_SPONSORS]);
      }, 250);
    });
  },

  /**
   * Obtiene los sponsors agrupados por categoría/tier.
   */
  async getSponsorsGroupedByTier(): Promise<Record<SponsorTier, Sponsor[]>> {
    const sponsors = await this.getSponsors();
    const grouped: Partial<Record<SponsorTier, Sponsor[]>> = {};

    sponsors.forEach((sponsor) => {
      if (!grouped[sponsor.tier]) {
        grouped[sponsor.tier] = [];
      }
      grouped[sponsor.tier]!.push(sponsor);
    });

    return grouped as Record<SponsorTier, Sponsor[]>;
  },

  /**
   * Permite simular el registro o propuesta de un nuevo sponsor al backend.
   */
  async submitSponsorProposal(data: Omit<Sponsor, "id">): Promise<Sponsor> {
    return new Promise((resolve) => {
      const newSponsor: Sponsor = {
        ...data,
        id: `sp-prop-${Date.now()}`,
      };
      MOCK_SPONSORS.push(newSponsor);
      setTimeout(() => resolve(newSponsor), 400);
    });
  },
};
