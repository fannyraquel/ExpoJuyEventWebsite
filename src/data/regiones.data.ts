import { Region, RegionDetail } from "../types/domain.types";

import punaImg from "../imports/1009085_1069018439842790_3425821509205860769_o.jpg";
import quebradaImg from "../imports/purmamarca.jpg";
import vallesImg from "../imports/Yungas-Camino-Qapag-na.jpg";
import yungasImg from "../imports/YUNGAS.jpg";

export const REGIONES: Record<Region, RegionDetail> = {
  puna: {
    nombre: "Puna",
    subtitulo: "Altura, sal y litio",
    color: "#7209B7",
    bg: "bg-orange-50",
    municipios: ["La Quiaca", "Abra Pampa", "Susques", "Rinconada"],
    productos: ["Litio", "Sal", "Camelidos", "Quinoa"],
    turismo: "Salinas Grandes, Manka Fiesta, Laguna de Pozuelos",
    cultura:
      "Carnaval Puneño, Artesanías en lana de llama, Manka Fiesta",
    img: punaImg,
  },

  quebrada: {
    nombre: "Quebrada",
    subtitulo: "Patrimonio de la Humanidad",
    color: "#1DBECB",
    bg: "bg-amber-50",
    municipios: ["Tilcara", "Purmamarca", "Humahuaca", "Maimará"],
    productos: [
      "Artesanías",
      "Cerámica",
      "Textiles andinos",
      "Gastronomía",
    ],
    turismo:
      "Quebrada de Humahuaca, Cerro de los 7 Colores, Pucará de Tilcara",
    cultura:
      "Carnaval de Humahuaca, Semana Santa Tilcara, Artesanías Jujeñas",
    img: quebradaImg,
  },

  valles: {
    nombre: "Valles",
    subtitulo: "Corazón productivo",
    color: "#1DBECB",
    bg: "bg-teal-50",
    municipios: ["Perico", "El Carmen", "San Pedro", "Palpalá"],
    productos: [
      "Tabaco",
      "Cítricos",
      "Soja",
      "Industria metal-mecánica",
    ],
    turismo:
      "Termas de Reyes, Parque Nacional Calilegua, San Salvador",
    cultura:
      "Fiestas patronales, Gastronomía criolla, Festival del Tabaco",
    img: vallesImg,
  },

  yungas: {
    nombre: "Yungas",
    subtitulo: "Selva y biodiversidad",
    color: "#7209B7",
    bg: "bg-purple-50",
    municipios: [
      "Libertador Gral. San Martín",
      "Fraile Pintado",
      "El Talar",
    ],
    productos: [
      "Caña de azúcar",
      "Cítricos",
      "Yerba mate",
      "Madera",
    ],
    turismo:
      "Parque Nacional Calilegua, Selva pedemontana, Ecoturismo",
    cultura:
      "Festival de la Zafra, Tradición cañera, Biodiversidad andina",
    img: yungasImg,
  },
};