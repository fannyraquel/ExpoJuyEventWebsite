# Documentación Técnica: Mapa Interactivo de ExpoJuy (`InteractiveMap`)

Esta documentación describe la arquitectura, funcionalidad, opciones de administración y guías de uso del componente **`InteractiveMap`**, utilizado para visualizar la distribución espacial de los stands y áreas clave de la **ExpoJuy 2026**.

---

## 📌 1. Visión General

El mapa interactivo ([`InteractiveMap.tsx`](file:///home/samas1503/Documentos/Proyectos/ExpoJuyEventWebsite/src/components/features/InteractiveMap.tsx)) proporciona una experiencia visual en tiempo real del plano del predio ferial.

### Características Principales

- **Navegación Dinámica (Zoom & Pan)**: Controles flotantes estilizados (*Zoom In*, *Zoom Out* y *Reset*) con soporte para gestos y centrado.
- **Normalización Inteligente de Coordenadas**: Capacidad para interpretar posiciones tanto en **porcentajes (`0% - 100%`)** como en **píxeles absolutos (`0 - 595px`, `0 - 426px`)**.
- **Categorización por Colores**: Identificación cromática automática según el rubro o categoría del stand (Minería, Agroindustria, Turismo, Textil, Gastronomía, Servicios).
- **Modo Ubicador de Coordenadas (Exclusivo Administrador)**: Herramienta integrada para administradores que permite hacer clic en cualquier punto del plano y obtener inmediatamente el código `{ x, y }` formateado.
- **Filtro y Búsqueda en Tiempo Real**: Filtrado síncrono por categoría de la barra principal o campo de búsqueda por nombre, empresa o id de stand.
- **Diseño Adaptativo con Glassmorphism Dark UI**: Paneles de control translúcidos con micro-animaciones y compatibilidad completa con temas claro y oscuro.

---

## 🏗️ 2. Estructura de Archivos y Componentes

| Archivo | Descripción |
| :--- | :--- |
| [`src/components/features/InteractiveMap.tsx`](file:///home/samas1503/Documentos/Proyectos/ExpoJuyEventWebsite/src/components/features/InteractiveMap.tsx) | Componente principal del plano interactivo. |
| [`src/types/domain.types.ts`](file:///home/samas1503/Documentos/Proyectos/ExpoJuyEventWebsite/src/types/domain.types.ts) | Definiciones de tipo para `Stand` y entidades del dominio. |
| [`src/data/stands.data.ts`](file:///home/samas1503/Documentos/Proyectos/ExpoJuyEventWebsite/src/data/stands.data.ts) | Dataset inicial con la ubicación y datos de stands. |
| [`src/context/AuthContext.tsx`](file:///home/samas1503/Documentos/Proyectos/ExpoJuyEventWebsite/src/context/AuthContext.tsx) | Contexto de autenticación para validar el rol `admin`. |

---

## ⚙️ 3. Especificación de Props e Interfaces

### `Stand` Interface

```typescript
export interface Stand {
  id: string;            // Identificador único (ej: "A1", "B2")
  empresa: string;       // Nombre de la empresa o entidad asignada
  categoria: string;     // Categoría/Rubro (Minería, Agroindustria, etc.)
  x: number;             // Coordenada X (en % o px de 0 a 595)
  y: number;             // Coordenada Y (en % o px de 0 a 426)
  w: number;             // Ancho de referencia del stand
  h: number;             // Alto de referencia del stand
  open: boolean;         // Estado de atención del stand (abierto/cerrado)
  numero?: string;       // Número de stand visible (opcional)
  nombre?: string;       // Nombre secundario o alias del espacio (opcional)
}
```

### `InteractiveMapProps`

```typescript
interface Props {
  stands: Stand[];       // Listado completo de stands obtenidos de la API/Service
  busqueda: string;      // Término de búsqueda introducido en la barra superior
  selectedCat: string;   // Categoría seleccionada ("Todos", "Cubiertos", etc.)
  isAdmin?: boolean;     // Sobrescribe opcionalmente el rol de admin para pruebas
}
```

---

## 🧮 4. Cálculo y Normalización de Coordenadas

El plano utiliza como dimensión base de referencia un lienzo de **595px (ancho) × 426px (alto)**.

Para permitir flexibilidad al cargar los datos desde bases de datos externas o archivos JSON, la función `getStandCoords()` realiza una conversión automática:

```typescript
function getStandCoords(x?: number, y?: number) {
  if (x === undefined || y === undefined) return null;
  
  // Si el valor es mayor a 100, se asume que está en píxeles y se convierte a porcentaje
  const pctX = x > 100 ? (x / 595) * 100 : x;
  const pctY = y > 100 ? (y / 426) * 100 : y;
  
  return {
    left: Math.max(2, Math.min(98, pctX)),
    top: Math.max(2, Math.min(98, pctY)),
  };
}
```

---

## 🎨 5. Codificación de Colores por Categoría

Los pines de ubicación sobre el mapa adoptan un color representativo utilizando la función `getCategoryColor()`:

| Categoría | Color Representativo | Código Hex |
| :--- | :--- | :--- |
| **Minería** | Púrpura Imperial | `#7209B7` |
| **Agroindustria** | Verde Esmeralda | `#10B981` |
| **Turismo** | Turquesa ExpoJuy | `#1DBECB` |
| **Textil / Artesanos** | Ámbar Cálido | `#F59E0B` |
| **Gastronomía** | Rojo Carmín | `#EF4444` |
| **Servicios** | Azul Real | `#3B82F6` |

---

## 🔐 6. Herramienta "Modo Ubicador" (Exclusivo Administrador)

El **Modo Ubicador** permite a los administradores registrar y ajustar fácilmente las coordenadas exactas de nuevos stands directamente sobre la imagen del mapa.

### Flujo de Uso

1. Iniciar sesión como usuario con rol **`admin`**.
2. En la esquina superior derecha del plano interactivo, hacer clic en el botón **`📍 Modo Ubicador`**.
3. Al posicionar el cursor sobre el mapa, el puntero cambiará a **cruceta (`crosshair`)**.
4. Hacer clic en la ubicación deseada del mapa.
5. Se abrirá una tarjeta desplegable mostrando las coordenadas en dos formatos:
   - **Porcentaje (`%`)**: Ideal para layouts responsivos.
   - **Píxeles (`px`)**: Ideal para referencias absolutas.
6. Hacer clic en **`Copiar %`** o **`Copiar px`** para enviar al portapapeles el fragmento listo para insertar en `STANDS`:

```typescript
// Ejemplo de fragmento copiado al portapapeles:
{ x: 45.2, y: 32.8 }
```

> [!NOTE]
> Para usuarios visitantes (`role === "visitor"`, `"exhibitor"` o `"press"`), el botón y la función de captura de coordenadas están completamente ocultos y deshabilitados por seguridad.

---

## 💻 7. Ejemplo de Integración en una Página

```tsx
import { useState, useEffect } from "react";
import InteractiveMap from "@components/features/InteractiveMap";
import { standsService } from "@api/services/standsService";
import { Stand } from "@appTypes/domain.types";

export default function MiPaginaPlano() {
  const [stands, setStands] = useState<Stand[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [selectedCat, setSelectedCat] = useState("Todos");

  useEffect(() => {
    standsService.getStands().then((res) => {
      if (res.success && res.data) {
        setStands(res.data);
      }
    });
  }, []);

  return (
    <div className="h-[650px] w-full rounded-2xl overflow-hidden shadow-2xl">
      <InteractiveMap
        stands={stands}
        busqueda={busqueda}
        selectedCat={selectedCat}
      />
    </div>
  );
}
```
