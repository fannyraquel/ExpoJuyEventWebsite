import { Region } from "@appTypes/domain.types";

/**
 * Empresas y emprendimientos de Jujuy
 *
 * Fuente:
 * Ministerio de Desarrollo Económico y Producción de Jujuy
 *
 * https://www.produccion.jujuy.gob.ar/?page_id=717
 *
 * La región representa la ubicación territorial de la
 * sede/localidad publicada por la fuente.
 */

/**
 * Posiciones REPRESENTATIVAS de las regiones
 * sobre la silueta de Jujuy.
 *
 * x = posición horizontal en porcentaje
 * y = posición vertical en porcentaje
 */
export const REGION_MAP_POSITIONS: Record<
  Region,
  {
    x: number;
    y: number;
  }
> = {
  puna: {
    x: 31,
    y: 17,
  },

  quebrada: {
    x: 43,
    y: 34,
  },

  valles: {
    x: 49,
    y: 57,
  },

  yungas: {
    x: 69,
    y: 65,
  },
};

/**
 * Modelo de una empresa/emprendimiento jujeño.
 */
export interface EmpresaJujuy {
  id: string;
  nombre: string;
  descripcion: string;
  localidad: string;
  region: Region;
  rubro: string;
  direccion?: string;
}

/**
 * Empresas y emprendimientos.
 */
export const EMPRESAS_JUJUY: EmpresaJujuy[] = [
  // ============================================================
  // QUEBRADA
  // ============================================================

  {
    id: "bodega-amanecer-andino",
    nombre: "Bodega Amanecer Andino",
    descripcion: "Vinos de altura",
    localidad: "Maimará",
    region: "quebrada",
    rubro: "Vitivinicultura",
    direccion: "RN 9 KM 1750, Chañarcito",
  },

  {
    id: "bodega-vinas-del-perchel",
    nombre: "Bodega Viñas del Perchel",
    descripcion: "Vinos de altura",
    localidad: "Tilcara",
    region: "quebrada",
    rubro: "Vitivinicultura",
    direccion: "RN 9 - Villa El Perchel",
  },

  {
    id: "de-la-quebrada-fieltro",
    nombre: "De La Quebrada Fieltro",
    descripcion:
      "Objetos de decoración e indumentaria en fieltro",
    localidad: "Tilcara",
    region: "quebrada",
    rubro: "Artesanías",
    direccion: "Rivadavia 463",
  },

  {
    id: "artesanias-unquillar",
    nombre: "Artesanías Unquillar",
    descripcion: "Artesanías",
    localidad: "Susques",
    region: "puna",
    rubro: "Artesanías",
    direccion: "Susques",
  },

  {
    id: "huerta-las-senoritas",
    nombre: "Huerta Las Señoritas",
    descripcion:
      "Producción agrícola, hortalizas y productos andinos",
    localidad: "Uquía - Humahuaca",
    region: "quebrada",
    rubro: "Agroindustria",
    direccion: "Finca La Señorita",
  },

  {
    id: "coop-cau-que-va",
    nombre: "Coop. C.A.U. Que. Va. Ltda.",
    descripcion:
      "Cultivo de hortalizas frescas y elaboración de productos Sin TACC",
    localidad: "Maimará",
    region: "quebrada",
    rubro: "Agroindustria",
    direccion: "RN 9 KM 1768",
  },

  {
    id: "bodega-don-milagro",
    nombre: "Bodega Don Milagro",
    descripcion: "Cultivo de vid y elaboración de vinos",
    localidad: "Purmamarca",
    region: "quebrada",
    rubro: "Vitivinicultura",
    direccion: "San Martín S/N",
  },

  {
    id: "te-pacha",
    nombre: "Te Pacha",
    descripcion: "Elaboración familiar de té blends",
    localidad: "Purmamarca",
    region: "quebrada",
    rubro: "Alimentos",
    direccion: "Finca Cholaloc",
  },

  {
    id: "bodega-artesanal-toroyoc",
    nombre: "Bodega Artesanal Toroyoc",
    descripcion:
      "Empresa familiar dedicada a la viticultura en la Quebrada de Humahuaca",
    localidad: "Tilcara",
    region: "quebrada",
    rubro: "Vitivinicultura",
    direccion: "La Banda S/N",
  },

  {
    id: "bodega-incahuasi",
    nombre: "Bodega Incahuasi",
    descripcion:
      "Bodega y viñedo artesanal con actividad enoturística",
    localidad: "Purmamarca",
    region: "quebrada",
    rubro: "Vitivinicultura",
    direccion: "Ruta 9 KM 1757",
  },

  {
    id: "la-misimiada",
    nombre: "La Mismiada",
    descripcion:
      "Textiles artesanales en fibra de llama y lana de oveja",
    localidad: "Tumbaya",
    region: "quebrada",
    rubro: "Textil",
    direccion: "Guillermo Snopeck S/N",
  },

  {
    id: "viñedos-yacoraite",
    nombre: "Viñedos Yacoraite S.A.",
    descripcion: "Producción de vinos de altura",
    localidad: "Huacalera",
    region: "quebrada",
    rubro: "Vitivinicultura",
    direccion: "Colonia San José",
  },

  {
    id: "la-huerta-tambo",
    nombre: "La Huerta Tambo",
    descripcion:
      "Producción láctea y queso de cabra",
    localidad: "Huacalera",
    region: "quebrada",
    rubro: "Agroindustria",
    direccion: "RN 9",
  },

  {
    id: "bodega-el-bayeh",
    nombre: "Bodega El Bayeh",
    descripcion: "Producción vitivinícola",
    localidad: "Maimará",
    region: "quebrada",
    rubro: "Vitivinicultura",
    direccion: "RN 9 KM 1688",
  },

  {
    id: "tejedores-andinos",
    nombre: "Tejedores Andinos",
    descripcion:
      "Diseño y producción textil en fibra de llama",
    localidad: "Huacalera",
    region: "quebrada",
    rubro: "Textil",
    direccion: "Inti Watana MZA 9",
  },

  // ============================================================
  // PUNA
  // ============================================================

  {
    id: "coop-productores-apicolas",
    nombre: "Coop. de Productores Apícolas de Jujuy Ltda.",
    descripcion: "Producción de miel pura de abejas",
    localidad: "Abra Pampa",
    region: "puna",
    rubro: "Agroindustria",
    direccion: "Abra Pampa",
  },

  {
    id: "la-granadena",
    nombre: "La Granadeña - Comunidad Aborigen Nuevo Pirquitas",
    descripcion: "Producción de quinoa",
    localidad: "Nuevo Pirquitas",
    region: "puna",
    rubro: "Agroindustria",
    direccion: "Nuevo Pirquitas",
  },

  {
    id: "jana-transporte",
    nombre: "Jana Transporte",
    descripcion:
      "Servicio automotor de transporte de pasajeros",
    localidad: "Rinconada",
    region: "puna",
    rubro: "Transporte",
    direccion: "Paraje Santo Domingo",
  },

  // ============================================================
  // VALLES
  // ============================================================

  {
    id: "hilanderia-warmi",
    nombre: "Hilandería Warmi",
    descripcion:
      "Productos textiles con fibras naturales de llama, oveja y algodón",
    localidad: "Palpalá",
    region: "valles",
    rubro: "Textil",
    direccion: "Parque Industrial Ing. Snopek",
  },

  {
    id: "dulces-artesanales-jusuy",
    nombre: "Dulces Artesanales Jusuy",
    descripcion:
      "Productos envasados, mermeladas, escabeches y chutney",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Alimentos",
    direccion: "Av. Balbín 318",
  },

  {
    id: "kunza-arte-pop-andino",
    nombre: "Kunza Arte Pop Andino",
    descripcion:
      "Productos decorativos y utilitarios de cerámica",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Artesanías",
    direccion: "Salta 851",
  },

  {
    id: "brew-point",
    nombre: "Brew Point SAS - Cerveza NOA",
    descripcion: "Cerveza artesanal",
    localidad: "Yala",
    region: "valles",
    rubro: "Alimentos",
    direccion: "Juan Ignacio Gorriti 483",
  },

  {
    id: "imanta",
    nombre: "Servicios Industriales S.A.S. - IMANTA",
    descripcion:
      "Fabricación de productos metálicos para uso estructural",
    localidad: "Palpalá",
    region: "valles",
    rubro: "Industria",
    direccion: "Av. Córdoba 60 - Río Blanco",
  },

  {
    id: "ibotchat",
    nombre: "IBOTCHAT - Ing. Claudio Saravia",
    descripcion:
      "Desarrollo de chatbots y software de asistencia automática",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Tecnología",
    direccion: "Av. Snopek 1138",
  },

  {
    id: "chaya-andina",
    nombre: "Chaya Andina",
    descripcion:
      "Fabricación de hilados textiles de lana, pelos y mezclas",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Textil",
    direccion: "Gral. Espejo 1940",
  },

  {
    id: "alfajores-el-molle",
    nombre: "Alfajores El Molle",
    descripcion:
      "Elaboración de alimentos y servicios gastronómicos",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Alimentos",
    direccion: "Av. Alte. Brown 626",
  },

  {
    id: "el-chucupal",
    nombre: "El Chucupal SRL",
    descripcion:
      "Elaboración y envasado de frutos en almíbar, mermeladas y dulces",
    localidad: "El Carmen",
    region: "valles",
    rubro: "Agroindustria",
    direccion: "Ruta 42",
  },

  {
    id: "kuntur",
    nombre: "Kuntur",
    descripcion:
      "Objetos artesanales en madera con aplicaciones de plata y textiles",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Artesanías",
    direccion: "El Ceibo 189",
  },

  {
    id: "yosy-kaspi",
    nombre: "Yosy - Kaspi",
    descripcion:
      "Juguetes didácticos en madera reforestada",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Diseño",
    direccion: "Iriarte 249",
  },

  {
    id: "artes-plasticas-cecilia",
    nombre: "Artes Plásticas Cecilia Espinoza",
    descripcion: "Producción artística",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Cultura",
    direccion: "Las Amapolas 867",
  },

  {
    id: "exincor",
    nombre: "EXINCOR S.R.L.",
    descripcion:
      "Producción de envases y embalajes de cartón corrugado",
    localidad: "Palpalá",
    region: "valles",
    rubro: "Industria",
    direccion: "La Noria - Río Blanco",
  },

  {
    id: "nona-olimpia",
    nombre: "Nona Olimpia",
    descripcion:
      "Cultivo de hojas verdes bajo sistema hidropónico",
    localidad: "Perico",
    region: "valles",
    rubro: "Agroindustria",
    direccion: "Ruta 53 - Las Pampitas",
  },

  {
    id: "copetines-rickas",
    nombre: "Copetines Rickas",
    descripcion:
      "Productos de copetín, papas fritas y maní salado",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Alimentos",
    direccion: "Mirabal 1321",
  },

  {
    id: "pop-prim",
    nombre: "Fábrica de Pochoclos Pop Prim",
    descripcion:
      "Elaboración de alimentos a base de cereales",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Alimentos",
    direccion: "General Paz 429",
  },

  {
    id: "artes-plasticas-ariel",
    nombre: "Artes Plásticas Ariel Cortez",
    descripcion:
      "Obras de arte, charlas y asesoramiento artístico",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Cultura",
    direccion: "Iriarte 586",
  },

  {
    id: "ingenio-la-esperanza",
    nombre: "Ingenio La Esperanza",
    descripcion:
      "Azúcar, azúcar orgánica, mieles, melazas y alcohol",
    localidad: "La Esperanza",
    region: "yungas",
    rubro: "Agroindustria",
    direccion: "Senador Pérez S/N",
  },

  {
    id: "molino-pampa-blanca",
    nombre: "Molino Pampa Blanca S.A.",
    descripcion:
      "Producción de harinas y subproductos de trigo",
    localidad: "Pampa Blanca",
    region: "valles",
    rubro: "Agroindustria",
    direccion: "RN 34 KM 1153",
  },

  {
    id: "gurreri-legumbres",
    nombre: "Gurrieri Legumbres SRL",
    descripcion:
      "Comercialización, procesamiento y exportación de granos y legumbres",
    localidad: "Perico",
    region: "valles",
    rubro: "Agroindustria",
    direccion: "Av. Malvinas Argentinas 397",
  },

  {
    id: "agroholon",
    nombre: "Agroholon",
    descripcion:
      "Producción agrícola de paltas y maracuyá",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Agroindustria",
    direccion: "Salta 1292",
  },

  {
    id: "girsu-jujuy",
    nombre: "GIRSU Jujuy S.E.",
    descripcion:
      "Producción de bioabono y asistencia técnica para gestión de residuos",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Ambiente",
    direccion: "Belgrano 1334",
  },

  {
    id: "ferigutti",
    nombre: "Ferigutti S.R.L.",
    descripcion: "Industria metalúrgica",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Industria",
    direccion: "Av. Hipólito Yrigoyen 1352",
  },

  {
    id: "sincretico-disenos",
    nombre: "Sincrético Diseños",
    descripcion:
      "Objetos y servicios de diseño",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Diseño",
    direccion: "Zapiola 435",
  },

  {
    id: "fan-plastico",
    nombre: "Fan Plástico Diseño Sustentable",
    descripcion:
      "Fabricación de mochilas, riñoneras, billeteras y gorros",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Diseño",
    direccion: "Juana Azurduy de Padilla 2355",
  },

  {
    id: "usound",
    nombre: "USOUND",
    descripcion:
      "Producción de audiómetro ultrapotátil",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Tecnología",
    direccion: "Gral. Belgrano 246",
  },

  {
    id: "challa-huasi",
    nombre: "Challa Huasi",
    descripcion:
      "Productos de platería y bazar con diseño andino",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Artesanías",
    direccion: "Gral. Martín Ledesma 255",
  },

  {
    id: "papelera-del-noa",
    nombre: "Papelera del NOA S.A.",
    descripcion:
      "Fábrica de pasta de madera, papel y cartón",
    localidad: "Palpalá",
    region: "valles",
    rubro: "Industria",
    direccion: "Ruta Provincial 1 KM 9",
  },

  {
    id: "bonhomia",
    nombre: "Bonhomia",
    descripcion:
      "Diseño de indumentaria basado en zero waste",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Textil",
    direccion: "Alto Comedero",
  },

  {
    id: "nunuri",
    nombre: "Ñuñuri",
    descripcion:
      "Elaboración de juegos y juguetes didácticos",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Diseño",
    direccion: "Alvear 735",
  },

  {
    id: "illari-puna",
    nombre: "Illari Puna",
    descripcion:
      "Diseño y desarrollo de productos textiles con fibras naturales",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Textil",
    direccion: "Dr. Aparicio 525",
  },

  {
    id: "terramaq",
    nombre: "Terramaq SRL",
    descripcion:
      "Recuperación de materiales y fabricación de productos plásticos reciclados",
    localidad: "Perico",
    region: "valles",
    rubro: "Ambiente",
    direccion: "Parque Industrial Perico",
  },

  {
    id: "cannava",
    nombre: "Cannava S.E.",
    descripcion:
      "Producción de sustancias químicas y productos farmacéuticos derivados de cannabis",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Industria",
    direccion: "La Caridad 320",
  },

  {
    id: "vexar",
    nombre: "Vexar SRL",
    descripcion:
      "Fabricación de carpintería metálica, PVC y madera",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Industria",
    direccion: "Colectora Ruta 9",
  },

  {
    id: "interfaz-digital",
    nombre: "Interfaz Digital SRL",
    descripcion:
      "Servicios de consultoría en tecnologías de la información",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Tecnología",
    direccion: "Independencia 466",
  },

  {
    id: "openix",
    nombre: "Openix SRL",
    descripcion:
      "Servicios de informática y software",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Tecnología",
    direccion: "Ecuador 185",
  },

  {
    id: "agricola-libanesa",
    nombre: "Agrícola Libanesa SRL",
    descripcion:
      "Cultivo de frutas e higos",
    localidad: "San Pedro",
    region: "yungas",
    rubro: "Agroindustria",
    direccion: "Finca Santa Ana",
  },

  {
    id: "metalurgica-tolaba",
    nombre: "Metalúrgica Tolaba",
    descripcion:
      "Fabricación de maquinaria de uso agropecuario y forestal",
    localidad: "Perico",
    region: "valles",
    rubro: "Industria",
    direccion: "Cuba 141",
  },

  {
    id: "geadata",
    nombre: "GEA DATA",
    descripcion:
      "Productos de software de geolocalización",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Tecnología",
    direccion: "Av. Balbín 2065",
  },

  {
    id: "gherargro",
    nombre: "Gherargro SRL",
    descripcion:
      "Elaboración de aceites y grasas vegetales sin refinar",
    localidad: "Perico",
    region: "valles",
    rubro: "Agroindustria",
    direccion: "Parque Industrial Perico",
  },

  {
    id: "mer-plast",
    nombre: "Mer-Plast",
    descripcion:
      "Reciclaje de polietileno y fabricación de bolsas plásticas",
    localidad: "Perico",
    region: "valles",
    rubro: "Ambiente",
    direccion: "Parque Industrial Perico",
  },

  {
    id: "rc-constructora",
    nombre: "RC Constructora SRL - DM Cortinas",
    descripcion:
      "Fabricación de cortinas, mobiliario y servicios de construcción",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Construcción",
    direccion: "Leopoldo Bárcena Este 34",
  },

  {
    id: "enviflex",
    nombre: "Enviflex SRL",
    descripcion:
      "Fabricación de big-bags con tela de rafia de polipropileno",
    localidad: "Palpalá",
    region: "valles",
    rubro: "Industria",
    direccion: "Parque Industrial Snopek",
  },

  {
    id: "debo-coser-mas",
    nombre: "Debo Coser Más",
    descripcion:
      "Confección y comercialización de productos de marroquinería",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Textil",
    direccion: "Tte. Bustos 648",
  },

  {
    id: "bodega-la-magdalena",
    nombre: "Bodega La Magdalena",
    descripcion: "Producción de vinos",
    localidad: "Monterrico",
    region: "valles",
    rubro: "Vitivinicultura",
    direccion: "Camino Vecinal Río Las Pavas",
  },

  {
    id: "bodega-finca-machuca",
    nombre: "Bodega Finca Machuca",
    descripcion: "Producción de vinos",
    localidad: "Monterrico",
    region: "valles",
    rubro: "Vitivinicultura",
    direccion: "RP 43 KM 7,5",
  },

  {
    id: "hotel-altos-de-la-vina",
    nombre: "Hotel Altos de la Viña",
    descripcion:
      "Servicios turísticos para San Salvador de Jujuy",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Turismo",
    direccion: "Av. Pasquini López 50",
  },

  {
    id: "mistura-jujuy",
    nombre: "Mistura Jujuy",
    descripcion:
      "Catering y restaurante de comidas regionales",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Gastronomía",
    direccion: "Sdor. Pérez 228",
  },

  {
    id: "el-bobinador",
    nombre: "El Bobinador",
    descripcion:
      "Reparación de motores y herramientas eléctricas",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Servicios",
    direccion: "Alte. Brown 573",
  },

  {
    id: "tims",
    nombre: "TIMS SAS",
    descripcion:
      "Reciclaje y reutilización de contenedores marítimos",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Ambiente",
    direccion: "Independencia 127",
  },

  {
    id: "da-vinci",
    nombre: "Da Vinci SAS",
    descripcion:
      "Agencia de comunicación integral",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Comunicación",
    direccion: "Dr. Jorge Moreno 2072",
  },

  {
    id: "tacita-de-plata",
    nombre: "Tacita de Plata - Filigrana",
    descripcion:
      "Fabricación de joyas exclusivas y artísticas",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Artesanías",
    direccion: "Gral. Belgrano 457",
  },

  {
    id: "pizzas-ian",
    nombre: "Pizzas Ian",
    descripcion:
      "Elaboración gastronómica de pizzas",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Gastronomía",
    direccion: "Av. Alte. Brown 1698",
  },

  {
    id: "harve",
    nombre: "HARVE SAS",
    descripcion:
      "Servicios de seguridad electrónica",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Tecnología",
    direccion: "Patricias Argentinas 470",
  },

  {
    id: "luna-de-colores",
    nombre: "Luna de Colores",
    descripcion:
      "Elaboración de juguetes de madera",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Diseño",
  },

  {
    id: "cosas-bonitas",
    nombre: "Cosas Bonitas",
    descripcion:
      "Costura creativa y accesorios textiles",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Textil",
    direccion: "Av. Balbín 2090",
  },

  {
    id: "allpaqa",
    nombre: "Allpaqa Alfajores",
    descripcion: "Fábrica de alfajores",
    localidad: "San Antonio",
    region: "valles",
    rubro: "Alimentos",
    direccion: "Nuevo Alisos",
  },

  {
    id: "osso-juguetes",
    nombre: "Osso Juguetes de Diseño",
    descripcion:
      "Fábrica de juguetes de diseño a escala",
    localidad: "Monterrico",
    region: "valles",
    rubro: "Diseño",
    direccion: "Finca Giacoppo",
  },

  {
    id: "constructora-wychay",
    nombre: "Constructora Wychay",
    descripcion:
      "Servicios integrales para obras civiles",
    localidad: "Palpalá",
    region: "valles",
    rubro: "Construcción",
    direccion: "La Noria - Río Blanco",
  },

  {
    id: "villa-luna-deco",
    nombre: "Villa Luna Deco",
    descripcion:
      "Fabricación de sillones, livings y tapicería",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Diseño",
    direccion: "Gral. Lamadrid 476",
  },

  {
    id: "punes-colchones",
    nombre: "Punes Fábrica de Colchones",
    descripcion:
      "Fábrica familiar de colchones",
    localidad: "Los Alisos",
    region: "valles",
    rubro: "Industria",
    direccion: "El Algarrobo S/N",
  },

  {
    id: "bakar",
    nombre: "BAKAR SAS",
    descripcion:
      "Fabricación y comercialización de puertas y muebles",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Industria",
    direccion: "Juan B. Justo 488",
  },

  {
    id: "atahualpa-maderas",
    nombre: "Atahualpa DC - Maderas",
    descripcion:
      "Fabricación de productos de madera",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Industria",
    direccion: "Las Heras 232",
  },

  {
    id: "consultora-behaked",
    nombre: "Consultora Behaked",
    descripcion:
      "Consultoría en estrategia, liderazgo y equipos",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Servicios",
    direccion: "Belgrano 860",
  },

  {
    id: "antropo-wine",
    nombre: "Antropo Wine - Norte Wine SAS",
    descripcion: "Bodega de vinos",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Vitivinicultura",
    direccion: "Hotel Altos de la Viña",
  },

  {
    id: "nga-construcciones",
    nombre: "NGA Construcciones SRL",
    descripcion:
      "Fabricación de productos premoldeados de hormigón",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Construcción",
    direccion: "Lanfranco esq. Tte. Tuco",
  },

  {
    id: "plh-leyenda",
    nombre: "PLH Leyenda",
    descripcion:
      "Diseño y producción de marroquinería, accesorios e indumentaria",
    localidad: "El Carmen",
    region: "valles",
    rubro: "Textil",
    direccion: "Finca Hansen - RP 42",
  },

  {
    id: "fuerza-chola",
    nombre: "Fuerza Chola",
    descripcion:
      "Serigrafía y diseño aplicado a indumentaria, objetos y papelería",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Diseño",
    direccion: "Suboficial Albelo 245",
  },

  {
    id: "gualicho-cueros",
    nombre: "Gualicho Cueros",
    descripcion:
      "Artículos de cuero con diseño jujeño",
    localidad: "Palpalá",
    region: "valles",
    rubro: "Artesanías",
    direccion: "Isla Trinidad 475",
  },

  {
    id: "mates-el-tata",
    nombre: "Mates El Tata",
    descripcion:
      "Diseño de mates y talabartería",
    localidad: "El Carmen",
    region: "valles",
    rubro: "Artesanías",
    direccion: "Colón 967",
  },

  {
    id: "sincronia",
    nombre: "Sincronía",
    descripcion:
      "Diseño textil especializado en pijamas",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Textil",
    direccion: "Dr. Chomnoles 100",
  },

  {
    id: "ojos-del-mundo",
    nombre: "Ojos del Mundo",
    descripcion:
      "Producción audiovisual especializada en turismo",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Turismo",
    direccion: "Ruta Provincial 2",
  },

  {
    id: "sakura",
    nombre: "Sakura",
    descripcion:
      "Producción y diseño de mobiliario en petiribí",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Diseño",
    direccion: "Suipacha 392",
  },

  {
    id: "romichi",
    nombre: "Romichi",
    descripcion:
      "Indumentaria sostenible basada en zero waste y slow fashion",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Textil",
    direccion: "Benavidez 271",
  },

  {
    id: "la-hurraca",
    nombre: "La Hurraca",
    descripcion:
      "Diseño y talabartería",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Artesanías",
    direccion: "Pasquini López 540",
  },

  {
    id: "fabrica-pastas-aranda",
    nombre: "Fábrica de Pastas Aranda - Indalif SRL",
    descripcion: "Fábrica de pastas frescas",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Alimentos",
    direccion: "Luis Burela 124",
  },

  {
    id: "niva",
    nombre: "NIVA",
    descripcion: "Fábrica de pastas frescas",
    localidad: "Perico",
    region: "valles",
    rubro: "Alimentos",
    direccion: "Parque Industrial Perico",
  },

  {
    id: "don-paulino",
    nombre: "Don Paulino",
    descripcion: "Fábrica de panificados",
    localidad: "Perico",
    region: "valles",
    rubro: "Alimentos",
    direccion: "Parque Industrial Perico",
  },

  {
    id: "white-business-solutions",
    nombre: "White Business Solutions S.R.L.",
    descripcion:
      "Consultoría y asistencia integral para empresas y organizaciones",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Servicios",
    direccion: "Ruta Nacional 9 KM 15",
  },

  // ============================================================
  // YUNGAS
  // ============================================================

  {
    id: "ledesema",
    nombre: "Ledesma S.A.A.I.",
    descripcion:
      "Azúcar, alcohol, caña de azúcar, cítricos y frutas",
    localidad: "Jujuy - Yungas",
    region: "yungas",
    rubro: "Agroindustria",
    direccion: "Actividad productiva en Jujuy",
  },

  {
    id: "ingenio-rio-grande",
    nombre: "Ingenio Río Grande S.A.",
    descripcion:
      "Producción de azúcar y alcohol etílico",
    localidad: "La Mendieta",
    region: "yungas",
    rubro: "Agroindustria",
    direccion: "Planta de producción La Mendieta",
  },

  {
    id: "finca-perales",
    nombre: "Finca Perales",
    descripcion:
      "Producción de cítricos y frutas tropicales",
    localidad: "Palma Sola",
    region: "yungas",
    rubro: "Agroindustria",
    direccion: "RP 6 KM 26",
  },

  {
    id: "coop-agricola-covay",
    nombre: "Coop. Agrícola COVAY Ltda.",
    descripcion:
      "Producción de tomate chilto, salsas y productos envasados",
    localidad: "Valle Grande",
    region: "yungas",
    rubro: "Agroindustria",
    direccion: "Pasaje San Juan 1",
  },

  {
    id: "mataca-film",
    nombre: "Mataca Film SRL",
    descripcion:
      "Producción de films y video",
    localidad: "Libertador Gral. San Martín",
    region: "yungas",
    rubro: "Comunicación",
    direccion: "Av. Libertad 461",
  },

  {
    id: "buhos-blancos",
    nombre: "Buhos Blancos S.R.L.",
    descripcion:
      "Emprendimiento forestal y producción de pisos de madera",
    localidad: "El Piquete",
    region: "yungas",
    rubro: "Industria",
    direccion: "Av. Senador Tanco 162",
  },

  {
    id: "restaurant-viracocha",
    nombre: "Restaurante Viracocha",
    descripcion:
      "Restaurante especializado en cocina regional jujeña y andina",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Gastronomía",
    direccion: "Independencia 994",
  },

  {
    id: "codepo",
    nombre: "CODEPO",
    descripcion:
      "Producción de caprinos y camélidos y productos despostados",
    localidad: "Jujuy",
    region: "puna",
    rubro: "Agroindustria",
    direccion: "Campo Verde",
  },

  {
    id: "vicus-pet",
    nombre: "Vicus Pet",
    descripcion:
      "Diseño textil para mascotas",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Diseño",
    direccion: "Cerro Centinela 1060",
  },

  {
    id: "fundacion-urku",
    nombre: "Fundación Urku",
    descripcion:
      "Servicios de trail y running",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Turismo",
    direccion: "Armonía 206",
  },

  {
    id: "la-mabucha",
    nombre: "La Mabucha",
    descripcion:
      "Productos de pastelería artesanal",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Alimentos",
    direccion: "Río Pilcomayo 1315",
  },

  {
    id: "mistura",
    nombre: "Mistura Jujuy",
    descripcion:
      "Catering y gastronomía regional",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Gastronomía",
    direccion: "Sdor. Pérez 228",
  },

  {
    id: "tren-solar",
    nombre: "Tren Solar de la Quebrada",
    descripcion:
      "Servicio de transporte ferroviario interurbano de pasajeros",
    localidad: "Jujuy",
    region: "quebrada",
    rubro: "Turismo",
  },

  {
    id: "lina-home-deco",
    nombre: "Lina Home Deco",
    descripcion:
      "Objetos de decoración y accesorios tejidos a mano",
    localidad: "San Salvador de Jujuy",
    region: "valles",
    rubro: "Diseño",
    direccion: "Pje. Lima 1027",
  },
];

/**
 * Empresas filtradas por región.
 */
export const getEmpresasPorRegion = (
  region: Region
): EmpresaJujuy[] => {
  return EMPRESAS_JUJUY.filter(
    (empresa) => empresa.region === region
  );
};

/**
 * Empresas filtradas por rubro.
 */
export const getEmpresasPorRubro = (
  rubro: string
): EmpresaJujuy[] => {
  return EMPRESAS_JUJUY.filter(
    (empresa) => empresa.rubro === rubro
  );
};

/**
 * Rubros disponibles para filtros.
 */
export const RUBROS_EMPRESAS_JUJUY = [
  ...new Set(
    EMPRESAS_JUJUY.map(
      (empresa) => empresa.rubro
    )
  ),
];

/**
 * Cantidad de empresas por región.
 */
export const EMPRESAS_POR_REGION: Record<
  Region,
  number
> = {
  puna: getEmpresasPorRegion("puna").length,
  quebrada: getEmpresasPorRegion("quebrada").length,
  valles: getEmpresasPorRegion("valles").length,
  yungas: getEmpresasPorRegion("yungas").length,
};