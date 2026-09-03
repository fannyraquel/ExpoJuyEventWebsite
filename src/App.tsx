import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

type Section = "inicio" | "sobre" | "explorar" | "agenda" | "negocios" | "plano" | "bioceánico" | "descubrí" | "data" | "noticias";
type Region = "puna" | "quebrada" | "valles" | "yungas";
type AgendaDay = 1 | 2 | 3 | 4;

// ── Data ───────────────────────────────────────────────────────────────────

const NOTICIAS = [
  {
    id: 1,
    tag: "Internacional",
    tagColor: "bg-[#0891B2] text-white",
    title: "ExpoJuy firma convenio con la Cámara de Comercio de Brasil",
    date: "28 ago 2026",
    img: "https://images.unsplash.com/photo-1765567972885-9b63d0f6c7db?w=600&h=380&fit=crop&auto=format",
    excerpt: "El acuerdo abre nuevas oportunidades para empresas del Corredor Bioceánico en mercados del MERCOSUR.",
  },
  {
    id: 2,
    tag: "Desarrollo productivo",
    tagColor: "bg-[#7209B7] text-white",
    title: "Minería del litio: récord de expositores del sector para 2026",
    date: "25 ago 2026",
    img: "https://images.unsplash.com/photo-1765567972996-92bf41b4b960?w=600&h=380&fit=crop&auto=format",
    excerpt: "Más de 40 empresas del sector minero confirmaron su presencia en el pabellón de la Puna.",
  },
  {
    id: 3,
    tag: "Turismo",
    tagColor: "bg-[#7209B7] text-white",
    title: "Quebrada de Humahuaca: destino estrella en la agenda internacional",
    date: "20 ago 2026",
    img: "https://images.unsplash.com/photo-1765567973009-5ee18972c42f?w=600&h=380&fit=crop&auto=format",
    excerpt: "El Patrimonio de la Humanidad suma nuevos circuitos turísticos presentados en ExpoJuy 2026.",
  },
];

type EventStatus = "próximo" | "siguiente" | "en vivo" | "finalizado" | "retrasado" | "cancelado";

// Status badges: solid bg + white text → legible en claro Y oscuro
const STATUS_CONFIG: Record<EventStatus, { textColor: string; bgColor: string; borderColor: string; icon: string; label: string }> = {
  "en vivo":    { textColor: "#FFFFFF", bgColor: "#16A34A", borderColor: "#15803D", icon: "●", label: "En vivo" },
  "siguiente":  { textColor: "#FFFFFF", bgColor: "#0891B2", borderColor: "#0E7490", icon: "▶", label: "Siguiente" },
  "próximo":    { textColor: "#FFFFFF", bgColor: "#1DBECB", borderColor: "#17A3AF", icon: "◎", label: "Próximo" },
  "finalizado": { textColor: "#FFFFFF", bgColor: "#6B7280", borderColor: "#4B5563", icon: "✓", label: "Finalizado" },
  "retrasado":  { textColor: "#FFFFFF", bgColor: "#D97706", borderColor: "#B45309", icon: "⏱", label: "Retrasado" },
  "cancelado":  { textColor: "#FFFFFF", bgColor: "#DC2626", borderColor: "#B91C1C", icon: "✕", label: "Cancelado" },
};

const AGENDA: Record<AgendaDay, Array<{ hora: string; titulo: string; rubro: string; lugar: string; status: EventStatus; idioma: string }>> = {
  1: [
    { hora: "09:00", titulo: "Apertura oficial ExpoJuy 2026", rubro: "Institucional", lugar: "Escenario Central", status: "finalizado", idioma: "ES" },
    { hora: "10:30", titulo: "Corredor Bioceánico: oportunidades para PYMES", rubro: "Comercio", lugar: "Sala A", status: "finalizado", idioma: "ES" },
    { hora: "13:00", titulo: "Panel: Minería responsable en la Puna", rubro: "Minería", lugar: "Sala B", status: "en vivo", idioma: "ES / EN" },
    { hora: "15:30", titulo: "Ronda de Negocios — Sesión 1", rubro: "Negocios", lugar: "Pabellón RdN", status: "siguiente", idioma: "ES / PT" },
    { hora: "18:00", titulo: "Charla: Turismo regenerativo en Quebrada", rubro: "Turismo", lugar: "Sala C", status: "próximo", idioma: "ES" },
  ],
  2: [
    { hora: "09:30", titulo: "Taller: Exportaciones agro desde Valles", rubro: "Agroindustria", lugar: "Sala A", status: "próximo", idioma: "ES" },
    { hora: "11:00", titulo: "Foro Internacional Litio & Baterías", rubro: "Minería", lugar: "Escenario Central", status: "próximo", idioma: "ES / EN / FR" },
    { hora: "14:00", titulo: "Ronda de Negocios — Sesión 2", rubro: "Negocios", lugar: "Pabellón RdN", status: "próximo", idioma: "ES / PT" },
    { hora: "16:30", titulo: "Presentación: Yungas y biodiversidad productiva", rubro: "Turismo", lugar: "Sala B", status: "próximo", idioma: "ES" },
  ],
  3: [
    { hora: "09:00", titulo: "Taller: Financiamiento para exportadores", rubro: "Finanzas", lugar: "Sala C", status: "próximo", idioma: "ES" },
    { hora: "11:30", titulo: "Cumbre de Municipios Productivos", rubro: "Institucional", lugar: "Escenario Central", status: "próximo", idioma: "ES" },
    { hora: "14:30", titulo: "Ronda de Negocios — Sesión 3", rubro: "Negocios", lugar: "Pabellón RdN", status: "próximo", idioma: "ES / PT / EN" },
    { hora: "17:00", titulo: "Arte y Cultura Jujuy: aguayo, cerámica, folklore", rubro: "Cultura", lugar: "Plaza Andina", status: "próximo", idioma: "ES" },
  ],
  4: [
    { hora: "10:00", titulo: "Clausura y entrega de reconocimientos", rubro: "Institucional", lugar: "Escenario Central", status: "próximo", idioma: "ES" },
    { hora: "12:00", titulo: "Presentación ExpoJuy DATA 2026", rubro: "Datos", lugar: "Sala A", status: "próximo", idioma: "ES / EN" },
    { hora: "15:00", titulo: "Cierre: Muestra gastronómica Jujuy", rubro: "Cultura", lugar: "Plaza Andina", status: "próximo", idioma: "ES" },
  ],
};

const EMPRESAS = [
  { nombre: "Litio Puna S.A.", rubro: "Minería", region: "Puna", busca: "Inversor", pais: "🇦🇷" },
  { nombre: "Agro Jujuy SRL", rubro: "Agroindustria", region: "Valles", busca: "Distribuidor", pais: "🇦🇷" },
  { nombre: "Quebrada Turismo", rubro: "Turismo", region: "Quebrada", busca: "Socio comercial", pais: "🇦🇷" },
  { nombre: "Yungas Bio S.A.", rubro: "Biodiversidad", region: "Yungas", busca: "Mercado externo", pais: "🇦🇷" },
  { nombre: "Perico Industrial", rubro: "Industria", region: "Valles", busca: "Distribuidor", pais: "🇦🇷" },
  { nombre: "Andina Textiles", rubro: "Textil", region: "Quebrada", busca: "Exportar", pais: "🇦🇷" },
  { nombre: "Salinas Grandes Corp.", rubro: "Minería", region: "Puna", busca: "Inversor", pais: "🇧🇷" },
  { nombre: "San Pedro Citrus", rubro: "Agroindustria", region: "Valles", busca: "Mercado externo", pais: "🇦🇷" },
];

const REGIONES: Record<Region, { nombre: string; subtitulo: string; color: string; bg: string; municipios: string[]; productos: string[]; turismo: string; cultura: string; img: string }> = {
  puna: {
    nombre: "Puna",
    subtitulo: "Altura, sal y litio",
    color: "#7209B7",
    bg: "bg-orange-50",
    municipios: ["La Quiaca", "Abra Pampa", "Susques", "Rinconada"],
    productos: ["Litio", "Sal", "Camelidos", "Quinoa"],
    turismo: "Salinas Grandes, Manka Fiesta, Laguna de Pozuelos",
    cultura: "Carnaval Puneño, Artesanías en lana de llama, Manka Fiesta",
    img: "https://images.unsplash.com/photo-1765567972885-9b63d0f6c7db?w=500&h=340&fit=crop&auto=format",
  },
  quebrada: {
    nombre: "Quebrada",
    subtitulo: "Patrimonio de la Humanidad",
    color: "#1DBECB",
    bg: "bg-amber-50",
    municipios: ["Tilcara", "Purmamarca", "Humahuaca", "Maimará"],
    productos: ["Artesanías", "Cerámica", "Textiles andinos", "Gastronomía"],
    turismo: "Quebrada de Humahuaca, Cerro de los 7 Colores, Pucará de Tilcara",
    cultura: "Carnaval de Humahuaca, Semana Santa Tilcara, Artesanías Jujeñas",
    img: "https://images.unsplash.com/photo-1765567973009-5ee18972c42f?w=500&h=340&fit=crop&auto=format",
  },
  valles: {
    nombre: "Valles",
    subtitulo: "Corazón productivo",
    color: "#1DBECB",
    bg: "bg-teal-50",
    municipios: ["Perico", "El Carmen", "San Pedro", "Palpalá"],
    productos: ["Tabaco", "Cítricos", "Soja", "Industria metal-mecánica"],
    turismo: "Termas de Reyes, Parque Nacional Calilegua, San Salvador",
    cultura: "Fiestas patronales, Gastronomía criolla, Festival del Tabaco",
    img: "https://images.unsplash.com/photo-1765567972948-04ae766cd510?w=500&h=340&fit=crop&auto=format",
  },
  yungas: {
    nombre: "Yungas",
    subtitulo: "Selva y biodiversidad",
    color: "#7209B7",
    bg: "bg-purple-50",
    municipios: ["Libertador Gral. San Martín", "Fraile Pintado", "El Talar"],
    productos: ["Caña de azúcar", "Cítricos", "Yerba mate", "Madera"],
    turismo: "Parque Nacional Calilegua, Selva pedemontana, Ecoturismo",
    cultura: "Festival de la Zafra, Tradición cañera, Biodiversidad andina",
    img: "https://images.unsplash.com/photo-1765574781860-9828db1d53c0?w=500&h=340&fit=crop&auto=format",
  },
};

const DATA_INDICATORS = [
  { label: "Expositores", value: "312", unit: "empresas", icon: "🏢" },
  { label: "M² de exposición", value: "18.400", unit: "m²", icon: "📐" },
  { label: "Países vinculados", value: "23", unit: "naciones", icon: "🌎" },
  { label: "Reuniones comerciales", value: "1.840", unit: "reuniones", icon: "🤝" },
  { label: "Mesas de negocios", value: "96", unit: "mesas", icon: "📋" },
  { label: "Visitantes esperados", value: "45.000", unit: "personas", icon: "👥" },
  { label: "Conferencias", value: "64", unit: "eventos", icon: "🎤" },
  { label: "Días de actividad", value: "4", unit: "jornadas", icon: "📅" },
  { label: "Negocios estimados", value: "USD 280M", unit: "proyectado", icon: "💰" },
];

const STANDS = [
  { id: "A1", empresa: "Litio Puna S.A.", categoria: "Minería", x: 60, y: 80, w: 80, h: 60, open: true },
  { id: "A2", empresa: "Agro Jujuy SRL", categoria: "Agroindustria", x: 160, y: 80, w: 80, h: 60, open: true },
  { id: "B1", empresa: "Quebrada Turismo", categoria: "Turismo", x: 60, y: 180, w: 80, h: 60, open: false },
  { id: "B2", empresa: "Andina Textiles", categoria: "Textil", x: 160, y: 180, w: 80, h: 60, open: true },
  { id: "C1", empresa: "Yungas Bio S.A.", categoria: "Biodiversidad", x: 60, y: 280, w: 80, h: 60, open: true },
  { id: "C2", empresa: "Perico Industrial", categoria: "Industria", x: 160, y: 280, w: 80, h: 60, open: false },
  { id: "D1", empresa: "Salinas Grandes Corp.", categoria: "Minería", x: 300, y: 80, w: 100, h: 140, open: true },
  { id: "D2", empresa: "San Pedro Citrus", categoria: "Agroindustria", x: 300, y: 250, w: 100, h: 90, open: true },
  { id: "S1", empresa: "🚻 Sanitarios", categoria: "Servicios", x: 260, y: 180, w: 30, h: 40, open: true },
  { id: "S2", empresa: "🍽 Gastronomía", categoria: "Gastronomía", x: 420, y: 80, w: 90, h: 180, open: true },
  { id: "S3", empresa: "🏥 Primeros Auxilios", categoria: "Servicios", x: 420, y: 270, w: 90, h: 70, open: true },
];

const CAT_COLORS: Record<string, string> = {
  "Minería": "#7209B7",
  "Agroindustria": "#1DBECB",
  "Turismo": "#7209B7",
  "Textil": "#1DBECB",
  "Biodiversidad": "#1DBECB",
  "Industria": "#8E8E93",
  "Servicios": "#8E8E93",
  "Gastronomía": "#A881FC",
};

// ── Components ─────────────────────────────────────────────────────────────

function AguayoDivider({ thin = false }: { thin?: boolean }) {
  return <div className={thin ? "aguayo-divider-thin" : "aguayo-divider"} />;
}

function StatusBadge({ status }: { status: EventStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold font-mono-data"
      style={{ background: cfg.bgColor, color: cfg.textColor, border: `1.5px solid ${cfg.borderColor}` }}
    >
      <span className={status === "en vivo" ? "live-pulse" : ""}>{cfg.icon}</span>
      {cfg.label}
    </span>
  );
}

const LANGS: Record<string, { label: string; border: string }> = {
  ES: { label: "Español",  border: "#74ACDF" },
  PT: { label: "Português", border: "#009C3B" },
  FR: { label: "Français",  border: "#002395" },
  EN: { label: "English",   border: "#B22234" },
};

function FlagIcon({ lang, size = 32 }: { lang: string; size?: number }) {
  const r = size / 2;
  const clipId = `flag-clip-${lang}-${size}`;
  const inner = r - 1.5;

  const flags: Record<string, React.ReactNode> = {
    // Argentina: celeste / blanco / celeste + sol
    ES: (
      <>
        <rect x={0} y={0}            width={size} height={size/3}       fill="#74ACDF" />
        <rect x={0} y={size/3}       width={size} height={size/3}       fill="#FFFFFF" />
        <rect x={0} y={(size/3)*2}   width={size} height={size/3+2}     fill="#74ACDF" />
        <circle cx={r} cy={r} r={size*0.13} fill="#F6B40E" />
      </>
    ),
    // Brasil: verde / rombo amarillo / círculo azul / banda blanca
    PT: (
      <>
        <rect x={0} y={0} width={size} height={size+2} fill="#009C3B" />
        <polygon
          points={`${r},${size*0.1} ${size*0.92},${r} ${r},${size*0.9} ${size*0.08},${r}`}
          fill="#FFDF00"
        />
        <circle cx={r} cy={r} r={size*0.28} fill="#002776" />
        <path
          d={`M ${r - size*0.26} ${r + size*0.04} A ${size*0.26} ${size*0.26} 0 0 1 ${r + size*0.26} ${r + size*0.04}`}
          fill="none" stroke="#FFFFFF" strokeWidth={size*0.07}
        />
      </>
    ),
    // Francia: azul / blanco / rojo vertical
    FR: (
      <>
        <rect x={0}           y={0} width={size/3}   height={size+2} fill="#002395" />
        <rect x={size/3}      y={0} width={size/3}   height={size+2} fill="#FFFFFF" />
        <rect x={(size/3)*2}  y={0} width={size/3+2} height={size+2} fill="#ED2939" />
      </>
    ),
    // EE.UU.: franjas rojas y blancas + cantón azul con estrellas
    EN: (
      <>
        {Array.from({ length: 13 }).map((_, i) => (
          <rect key={i} x={0} y={(size/13)*i} width={size} height={size/13+1}
            fill={i % 2 === 0 ? "#B22234" : "#FFFFFF"} />
        ))}
        <rect x={0} y={0} width={size*0.4} height={size*0.54} fill="#3C3B6E" />
        {[...Array(3)].map((_, row) =>
          [...Array(row % 2 === 0 ? 3 : 2)].map((__, col) => (
            <text key={`${row}-${col}`}
              x={(col + (row % 2 === 0 ? 0.17 : 0.5)) * (size * 0.4 / 3)}
              y={(row + 0.7) * (size * 0.54 / 4)}
              fontSize={size * 0.1} fill="#FFFFFF" textAnchor="middle">★</text>
          ))
        )}
      </>
    ),
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block", borderRadius: "50%" }}>
      <defs>
        <clipPath id={clipId}>
          <circle cx={r} cy={r} r={inner} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>{flags[lang]}</g>
      <circle cx={r} cy={r} r={inner} fill="none" stroke={LANGS[lang].border} strokeWidth="2" />
    </svg>
  );
}

function LangSelector() {
  const [selected, setSelected] = useState("ES");
  const [open, setOpen] = useState(false);
  const { border } = LANGS[selected];

  return (
    <div className="relative hidden sm:block">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-center rounded-full transition-transform hover:scale-105 focus:outline-none"
        style={{ border: `2.5px solid ${border}`, padding: 1 }}
        aria-label="Seleccionar idioma"
      >
        <FlagIcon lang={selected} size={30} />
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          {/* Dropdown */}
          <div className="absolute right-0 top-10 z-50 bg-[#1A1A2E] rounded-xl shadow-xl overflow-hidden border border-white/10 min-w-[140px]">
            {Object.entries(LANGS).map(([code, { label, border: b }]) => (
              <button
                key={code}
                onClick={() => { setSelected(code); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-white/10 ${selected === code ? "bg-white/10" : ""}`}
              >
                <FlagIcon lang={code} size={22} />
                <span className="text-white font-semibold">{code}</span>
                <span className="text-white/50 text-xs">{label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function NavBar({ active, setActive, darkMode, setDarkMode }: {
  active: Section;
  setActive: (s: Section) => void;
  darkMode: boolean;
  setDarkMode: (v: boolean) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links: [Section, string][] = [
    ["inicio", "Inicio"],
    ["explorar", "Explorar"],
    ["agenda", "Agenda"],
    ["negocios", "Ronda Negocios"],
    ["plano", "Plano"],
    ["descubrí", "Descubrí Jujuy"],
    ["data", "ExpoJuy DATA"],
    ["noticias", "Noticias"],
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b-2 transition-colors duration-300"
      style={{ background: "var(--t-nav-bg)", borderBottomColor: "var(--t-nav-border)" }}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        {/* Logo — RGB PNG: mix-blend-lighten en oscuro, normal en claro */}
        <button onClick={() => setActive("inicio")}>
          <img
            src="/src/assets/EXPOJUY_Logo2026/RGB/expojuy26_horizontal.png"
            alt="ExpoJuy 2026"
            className="h-9 w-auto object-contain transition-all duration-300"
            style={{ mixBlendMode: darkMode ? "lighten" : "normal" }}
          />
        </button>

        <div className="hidden lg:flex items-center gap-1">
          {links.map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className="px-3 py-1.5 rounded text-xs font-semibold transition-all"
              style={{
                background: active === key ? "#7209B7" : "transparent",
                color: active === key ? "#FFFFFF" : "var(--t-text)",
              }}
              onMouseEnter={e => { if (active !== key) (e.currentTarget as HTMLElement).style.background = "rgba(114,9,183,0.12)"; }}
              onMouseLeave={e => { if (active !== key) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Dark/light toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300"
            style={{ borderColor: "#1DBECB", color: "var(--t-text)" }}
            aria-label="Cambiar modo"
            title={darkMode ? "Modo claro" : "Modo oscuro"}
          >
            {darkMode ? (
              /* Sol */
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1DBECB" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              /* Luna */
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#7209B7" stroke="#7209B7" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          <LangSelector />

          <button
            className="lg:hidden text-sm"
            style={{ color: "var(--t-text)" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >☰</button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="lg:hidden border-t px-4 py-3 flex flex-col gap-2 transition-colors duration-300"
          style={{ background: "var(--t-nav-bg)", borderTopColor: "rgba(114,9,183,0.3)" }}
        >
          {links.map(([key, label]) => (
            <button key={key} onClick={() => { setActive(key); setMenuOpen(false); }}
              className="text-left px-3 py-2 rounded text-sm font-semibold transition-colors"
              style={{
                background: active === key ? "#7209B7" : "transparent",
                color: active === key ? "#FFFFFF" : "var(--t-text)",
              }}>
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ── Sections ───────────────────────────────────────────────────────────────

function Inicio({ setActive }: { setActive: (s: Section) => void }) {
  const [search, setSearch] = useState("");
  return (
    <div>
      {/* Hero */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 4-panel vertical split background */}
        <div className="absolute inset-0 flex flex-row">
          <div className="flex-1 overflow-hidden">
            <img src="/src/imports/purmamarca.jpg" alt="Purmamarca" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 overflow-hidden">
            <img src="/src/imports/453b.jpg" alt="Puna" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 overflow-hidden">
            <img src="/src/imports/Yungas-Camino-Qapag-na.jpg" alt="Yungas" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 overflow-hidden">
            <img src="/src/imports/images.jpg" alt="Quebrada" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/80 via-[#1A1A2E]/65 to-[#1A1A2E]/92" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">

          {/* EXPOJUY wordmark */}
          <h1 className="font-display font-black leading-none mb-4" style={{ fontSize: "clamp(3.5rem, 12vw, 8rem)" }}>
            {/* E con barra turquesa */}
            <span className="relative inline-block">
              <span className="absolute -top-2 left-0 h-[6px] w-[55%] rounded-sm" style={{ background: "#1DBECB" }} />
              <span className="text-white">E</span>
            </span>
            <span className="text-white">XPO</span>
            {/* J con barra púrpura */}
            <span className="relative inline-block">
              <span className="absolute -top-2 left-[40%] h-[6px] w-[28%] rounded-sm" style={{ background: "#7209B7" }} />
              <span className="text-white">J</span>
            </span>
            <span className="text-white">UY</span>
          </h1>

          {/* Tagline */}
          <div className="flex flex-col items-center gap-1 mb-8">
            <div className="flex items-center gap-3 text-white/90">
              <span className="font-display text-sm md:text-base font-normal tracking-widest uppercase text-white/60">Conectando</span>
              <span className="font-display text-base md:text-xl font-black tracking-widest uppercase">Países</span>
              <span className="h-px w-10 bg-white/30 hidden sm:block" />
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <span className="h-px w-10 bg-white/30 hidden sm:block" />
              <span className="font-display text-sm md:text-base font-normal tracking-widest uppercase text-white/60">Creando</span>
              <span className="font-display text-base md:text-xl font-black tracking-widest uppercase">Oportunidades</span>
            </div>
          </div>
          <p className="text-[#FFFFFF]/80 text-base md:text-lg mb-8 max-w-2xl mx-auto">
            La feria de negocios, cultura e innovación más importante del NOA. 4 jornadas, 312 expositores, 23 países, 1.840 reuniones comerciales.
          </p>

          {/* Buscador global */}
          <div className="flex gap-2 max-w-xl mx-auto mb-8">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscá empresa, rubro o actividad..."
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-[#1DBECB] text-sm"
            />
            <button
              onClick={() => setActive("explorar")}
              className="bg-[#7209B7] hover:bg-[#4D0080] text-white px-5 py-3 rounded-lg font-semibold transition-colors text-sm"
            >
              Buscar
            </button>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <button onClick={() => setActive("agenda")} className="bg-[#1DBECB] hover:bg-[#7209B7] text-white px-8 py-3.5 rounded-lg font-bold text-base transition-colors">
              Inscribite
            </button>
            <button onClick={() => setActive("explorar")} className="border-2 border-[#1DBECB] text-[#1DBECB] hover:bg-[#1DBECB] hover:text-white px-8 py-3.5 rounded-lg font-bold text-base transition-all">
              Sumate como expositor
            </button>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[["312","Expositores"],["23","Países"],["4","Jornadas"],["45K","Visitantes"]].map(([v, l]) => (
              <div key={l} className="bg-white/10 backdrop-blur rounded-lg p-3">
                <div className="font-display text-2xl font-black text-[#1DBECB]">{v}</div>
                <div className="text-[#FFFFFF]/70 text-xs">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AguayoDivider />

      {/* 3 Noticias destacadas */}
      <div className="py-16 px-4" style={{ background: "var(--t-bg)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-3xl font-bold" style={{ color: "var(--t-text)" }}>Noticias destacadas</h2>
            <button onClick={() => setActive("noticias")} className="text-[#7209B7] text-sm font-semibold hover:underline">Ver todas →</button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {NOTICIAS.map(n => (
              <article key={n.id} className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group" style={{ background: "var(--t-card)", border: "1px solid var(--t-card-border)" }}>
                <div className="overflow-hidden bg-[#F0F0F5] h-48">
                  <img src={n.img} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 tracking-wide ${n.tagColor}`}>{n.tag}</span>
                  <h3 className="font-display font-bold text-lg leading-snug mb-2" style={{ color: "var(--t-text)" }}>{n.title}</h3>
                  <p className="text-sm" style={{ color: "var(--t-text-muted)" }}>{n.excerpt}</p>
                  <div className="font-mono-data text-xs mt-3" style={{ color: "var(--t-text-muted)" }}>{n.date}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <AguayoDivider thin />

      {/* Agenda resumida */}
      <div className="bg-[#1A1A2E] py-14 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-3xl font-bold text-[#FFFFFF]">Próximas actividades</h2>
            <button onClick={() => setActive("agenda")} className="text-[#1DBECB] text-sm font-semibold hover:underline">Ver agenda completa →</button>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {AGENDA[1].filter(e => e.status !== "finalizado").slice(0, 4).map((e, i) => (
              <div key={i} className="flex items-start gap-4 bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="font-mono-data text-[#1DBECB] text-sm font-bold min-w-[3rem]">{e.hora}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[#FFFFFF] font-semibold text-sm truncate">{e.titulo}</div>
                  <div className="text-[#FFFFFF]/50 text-xs mt-0.5">{e.lugar} · {e.idioma}</div>
                </div>
                <StatusBadge status={e.status} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <AguayoDivider />

      {/* Sponsors */}
      <div className="py-12 px-4" style={{ background: "var(--t-surface)" }}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-xs font-mono-data uppercase tracking-widest mb-6" style={{ color: "var(--t-text-muted)" }}>Sponsors Oficiales 2026</div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {["Gobierno de Jujuy", "Ministerio de Producción", "Cámara de Comercio NOA", "Banco Nación", "CONICET", "ProArgentina"].map(s => (
              <div key={s} className="font-display font-bold text-lg hover:opacity-100 transition-opacity cursor-pointer" style={{ color: "var(--t-text)" }}>{s}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Sobre() {
  return (
    <div className="pt-14">
      <div className="bg-[#1A1A2E] py-20 px-4 text-center">
        <div className="font-mono-data text-[#1DBECB] text-xs uppercase tracking-widest mb-4">Sobre ExpoJuy</div>
        <h1 className="font-display text-5xl md:text-6xl font-black text-white mb-4">
          Historia &amp; Misión
        </h1>
        <p className="text-[#FFFFFF]/70 max-w-2xl mx-auto text-lg">
          Desde 2014, ExpoJuy conecta a Jujuy con el mundo, siendo el principal evento comercial del Noroeste Argentino.
        </p>
      </div>
      <AguayoDivider />
      <div className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#4A4A4A] mb-4">Historia y ediciones</h2>
          <div className="space-y-4">
            {[["2014","Primera edición: 80 expositores, foco local"],["2016","Apertura regional: NOA + Bolivia"],["2018","Primera delegación internacional de Brasil"],["2020","Edición virtual: 6.000 participantes online"],["2022","Récord: 240 expositores, 15 países"],["2024","ExpoJuy en el mapa del Corredor Bioceánico"],["2026","Edición de la integración: 312 expositores, 23 países"]].map(([year, desc]) => (
              <div key={year} className="flex gap-4">
                <div className="font-mono-data text-[#7209B7] font-bold text-sm min-w-[3rem]">{year}</div>
                <div className="text-[#4A4A4A]/80 text-sm border-l-2 border-[#1DBECB]/30 pl-4">{desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-[#4A4A4A] mb-4">Lema 2026</h2>
          <div className="bg-[#7209B7] text-white p-6 rounded-xl mb-6">
            <div className="font-display text-2xl italic font-bold">"Jujuy al mundo, el mundo a Jujuy"</div>
          </div>
          <p className="text-[#4A4A4A]/70 mb-6">
            ExpoJuy 2026 apuesta a la integración regional como motor del desarrollo productivo. El Corredor Bioceánico Brasil–Paraguay–Jujuy–Chile es el eje central de nuestra propuesta de valor.
          </p>
          <div className="bg-[#F0F0F5] rounded-xl p-6">
            <h3 className="font-semibold text-[#4A4A4A] mb-3">Contacto institucional</h3>
            <div className="space-y-2 text-sm text-[#4A4A4A]/70">
              <div>📧 info@expojuy.gob.ar</div>
              <div>📞 +54 388 422-XXXX</div>
              <div>📍 Predio Ferial, San Salvador de Jujuy</div>
              <div>🌐 expojuy.gob.ar</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Explorar() {
  const [filtroRubro, setFiltroRubro] = useState("Todos");
  const [filtroBusca, setFiltroBusca] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const rubros = ["Todos", ...Array.from(new Set(EMPRESAS.map(e => e.rubro)))];
  const busca = ["Todos", ...Array.from(new Set(EMPRESAS.map(e => e.busca)))];

  const filtered = EMPRESAS.filter(e => {
    const matchRubro = filtroRubro === "Todos" || e.rubro === filtroRubro;
    const matchBusca = filtroBusca === "Todos" || e.busca === filtroBusca;
    const matchSearch = !busqueda || e.nombre.toLowerCase().includes(busqueda.toLowerCase()) || e.rubro.toLowerCase().includes(busqueda.toLowerCase());
    return matchRubro && matchBusca && matchSearch;
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
              onChange={e => setBusqueda(e.target.value)}
              placeholder="Buscar por nombre, rubro o CUIT..."
              className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white text-sm"
            />
            <button className="bg-[#1A1A2E] text-white px-5 py-3 rounded-lg font-semibold text-sm">Buscar</button>
          </div>
        </div>
      </div>
      <AguayoDivider />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-wrap gap-3 mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-[#4A4A4A]/50 uppercase">Rubro:</span>
            {rubros.map(r => (
              <button key={r} onClick={() => setFiltroRubro(r)}
                className="px-3 py-1 rounded-full text-xs font-semibold border transition-all"
                style={filtroRubro === r
                  ? { background: "#7209B7", color: "#FFFFFF", borderColor: "#7209B7" }
                  : { background: "var(--t-surface)", color: "var(--t-text)", borderColor: "var(--t-card-border)" }}>
                {r}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold uppercase" style={{ color: "var(--t-text-muted)" }}>Busca:</span>
            {busca.map(b => (
              <button key={b} onClick={() => setFiltroBusca(b)}
                className="px-3 py-1 rounded-full text-xs font-semibold border transition-all"
                style={filtroBusca === b
                  ? { background: "#0891B2", color: "#FFFFFF", borderColor: "#0891B2" }
                  : { background: "var(--t-surface)", color: "var(--t-text)", borderColor: "var(--t-card-border)" }}>
                {b}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map(e => (
            <div key={e.nombre} className="rounded-xl p-5 hover:shadow-md transition-all group" style={{ background: "var(--t-card)", border: "1px solid var(--t-card-border)" }}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ background: CAT_COLORS[e.rubro] + "20" }}>
                  {e.pais}
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: "var(--t-surface)", color: "var(--t-text)", border: "1px solid var(--t-card-border)" }}>{e.region}</span>
              </div>
              <h3 className="font-display font-bold mb-1 leading-snug" style={{ color: "var(--t-text)" }}>{e.nombre}</h3>
              <div className="text-xs mb-3" style={{ color: "var(--t-text-muted)" }}>{e.rubro}</div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold" style={{ color: CAT_COLORS[e.rubro] || "#7209B7" }}>
                  Busca: {e.busca}
                </span>
                <button className="text-xs text-[#1DBECB] font-bold opacity-0 group-hover:opacity-100 transition-opacity">Conectar →</button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#4A4A4A]/40 font-display text-xl">No se encontraron empresas con esos filtros.</div>
        )}
      </div>
    </div>
  );
}

function Agenda() {
  const [day, setDay] = useState<AgendaDay>(1);
  const [filtroRubro, setFiltroRubro] = useState("Todos");

  const allRubros = ["Todos", ...Array.from(new Set(Object.values(AGENDA).flat().map(e => e.rubro)))];
  const eventos = AGENDA[day].filter(e => filtroRubro === "Todos" || e.rubro === filtroRubro);

  return (
    <div className="pt-14">
      <div className="bg-[#1A1A2E] py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="font-mono-data text-[#1DBECB] text-xs uppercase tracking-widest mb-3">12–15 Octubre 2026</div>
          <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-4">Agenda</h1>
          <p className="text-[#FFFFFF]/60 text-base">Estados en tiempo real. Filtrá por rubro, idioma o jornada.</p>
        </div>
      </div>
      <AguayoDivider />
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Day selector */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {([1,2,3,4] as AgendaDay[]).map(d => (
            <button key={d} onClick={() => setDay(d)}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${day === d ? "bg-[#7209B7] text-white" : "bg-white border border-[#F0F0F5] text-[#4A4A4A] hover:border-[#7209B7]"}`}>
              Jornada {d} — {["12 Oct","13 Oct","14 Oct","15 Oct"][d-1]}
            </button>
          ))}
        </div>
        {/* Rubro filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {allRubros.map(r => (
            <button key={r} onClick={() => setFiltroRubro(r)}
              className="px-3 py-1 rounded-full text-xs font-semibold border transition-all"
              style={filtroRubro === r
                ? { background: "#0891B2", color: "#FFFFFF", borderColor: "#0891B2" }
                : { background: "var(--t-surface)", color: "var(--t-text)", borderColor: "var(--t-card-border)" }}>
              {r}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {eventos.map((e, i) => {
            const cfg = STATUS_CONFIG[e.status];
            return (
              <div key={i} className="flex items-start gap-4 rounded-xl p-5 border transition-all"
                style={{ background: "var(--t-card)", borderColor: cfg.borderColor, borderLeftWidth: 4 }}>
                <div className="font-mono-data font-bold text-lg min-w-[3.5rem]" style={{ color: cfg.bgColor }}>{e.hora}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-bold text-lg leading-snug" style={{ color: "var(--t-text)" }}>{e.titulo}</div>
                  <div className="flex flex-wrap gap-3 mt-1 text-xs" style={{ color: "var(--t-text-muted)" }}>
                    <span>📍 {e.lugar}</span>
                    <span>🌐 {e.idioma}</span>
                    <span className="font-semibold" style={{ color: "#7209B7" }}>{e.rubro}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <StatusBadge status={e.status} />
                  <button className="text-xs text-[#1DBECB] font-semibold hover:underline">+ Mi agenda</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Negocios() {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <div className="pt-14">
      <div className="relative overflow-hidden bg-[#7209B7] py-20 px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="aguayo-divider h-full" style={{ backgroundSize: "96px 100%", height: "100%" }} />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="font-mono-data text-[#1DBECB] text-xs uppercase tracking-widest mb-3">Ronda de Negocios</div>
          <h1 className="font-display text-5xl font-black text-white mb-4">Conectá con el mundo</h1>
          <p className="text-white/70 text-lg mb-8">El espacio de encuentro B2B más relevante del NOA. Reuniones pactadas, agenda personalizada, resultados concretos.</p>
          <button className="bg-[#1DBECB] hover:bg-[#7209B7] text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors">
            Inscribirse a la Ronda
          </button>
        </div>
      </div>
      <AguayoDivider />
      {/* Indicators */}
      <div className="bg-[#FFFFFF] py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[["96","Mesas","📋"],["1.840","Reuniones","🤝"],["23","Países","🌎"],["4","Jornadas","📅"]].map(([v,l,icon]) => (
            <div key={l} className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-3xl mb-2">{icon}</div>
              <div className="font-display text-4xl font-black text-[#7209B7]">{v}</div>
              <div className="text-[#4A4A4A]/60 text-sm mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Empresas con conectar */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="font-display text-2xl font-bold text-[#4A4A4A] mb-6">Perfiles disponibles</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {EMPRESAS.map(e => (
            <div key={e.nombre} className="bg-white rounded-xl p-5 border border-[#F0F0F5] hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display font-bold text-[#4A4A4A]">{e.nombre}</h3>
                <span className="text-xs font-mono-data bg-[#F0F0F5] text-[#4A4A4A]/50 px-2 py-0.5 rounded">{e.pais}</span>
              </div>
              <div className="flex gap-2 flex-wrap text-xs mb-3">
                <span className="px-2.5 py-1 rounded-full font-bold" style={{ background: "#7209B7", color: "#FFFFFF" }}>{e.rubro}</span>
                <span className="px-2.5 py-1 rounded-full font-bold" style={{ background: "#0891B2", color: "#FFFFFF" }}>{e.region}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#4A4A4A]/60 text-xs">Busca: <strong>{e.busca}</strong></span>
                <button
                  onClick={() => setExpanded(expanded === e.nombre ? null : e.nombre)}
                  className="bg-[#1DBECB] hover:bg-[#7209B7] text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors"
                >
                  {expanded === e.nombre ? "Ocultar" : "Conectar"}
                </button>
              </div>
              {expanded === e.nombre && (
                <div className="mt-4 pt-4 border-t border-[#F0F0F5] space-y-2">
                  <input placeholder="Tu nombre completo" className="w-full border border-[#F0F0F5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1DBECB]" />
                  <input placeholder="Tu empresa" className="w-full border border-[#F0F0F5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1DBECB]" />
                  <input placeholder="Tu email" className="w-full border border-[#F0F0F5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#1DBECB]" />
                  <button className="w-full bg-[#1DBECB] text-white py-2 rounded-lg font-bold text-sm">Enviar solicitud</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Plano() {
  const [busqueda, setBusqueda] = useState("");
  const [selectedCat, setSelectedCat] = useState("Todos");
  const [hovered, setHovered] = useState<string | null>(null);

  const cats = ["Todos", ...Array.from(new Set(STANDS.map(s => s.categoria)))];
  const highlighted = busqueda
    ? STANDS.find(s => s.empresa.toLowerCase().includes(busqueda.toLowerCase()))?.id
    : null;

  return (
    <div className="pt-14">
      <div className="bg-[#1DBECB] py-14 px-4 text-center">
        <div className="font-mono-data text-white/70 text-xs uppercase tracking-widest mb-3">Plano interactivo</div>
        <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-4">Mapa del predio</h1>
        <p className="text-white/70">Encontrá tu stand, filtrá por categoría y conocé el estado de cada espacio.</p>
      </div>
      <AguayoDivider />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            placeholder="Buscar empresa o stand..."
            className="flex-1 border border-[#F0F0F5] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#1DBECB]"
          />
          <div className="flex flex-wrap gap-2">
            {cats.map(c => (
              <button key={c} onClick={() => setSelectedCat(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${selectedCat === c ? "bg-[#1DBECB] text-white border-[#1DBECB]" : "border-[#4A4A4A]/20 text-[#4A4A4A]/60"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* SVG Plano */}
        <div className="bg-[#F0F0F5] rounded-2xl p-6 overflow-x-auto">
          <svg viewBox="0 0 540 400" className="w-full max-w-2xl mx-auto" style={{ minWidth: 340 }}>
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#4A4A4A" strokeWidth="0.3" opacity="0.2"/>
              </pattern>
            </defs>
            <rect width="540" height="400" fill="url(#grid)" />

            {/* Entradas */}
            <rect x="10" y="180" width="40" height="40" fill="#1DBECB" rx="4" />
            <text x="30" y="205" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">ENTRADA</text>
            <rect x="490" y="180" width="40" height="40" fill="#1DBECB" rx="4" />
            <text x="510" y="205" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">SALIDA</text>

            {/* Pasillo central */}
            <rect x="250" y="50" width="40" height="300" fill="#4A4A4A" opacity="0.06" />
            <text x="270" y="210" textAnchor="middle" fontSize="8" fill="#4A4A4A" opacity="0.5" transform="rotate(-90,270,210)">PASILLO CENTRAL</text>

            {STANDS.map(s => {
              const isHighlighted = highlighted === s.id;
              const catMatch = selectedCat === "Todos" || s.categoria === selectedCat;
              const color = CAT_COLORS[s.categoria] || "#999";
              const opacity = catMatch ? 1 : 0.2;
              const isHov = hovered === s.id;

              return (
                <g key={s.id} style={{ cursor: "pointer", opacity }}
                  onMouseEnter={() => setHovered(s.id)}
                  onMouseLeave={() => setHovered(null)}>
                  <rect
                    x={s.x} y={s.y} width={s.w} height={s.h}
                    fill={isHighlighted ? "#1DBECB" : color}
                    fillOpacity={isHov ? 1 : 0.85}
                    stroke={isHighlighted ? "#7209B7" : isHov ? "#4A4A4A" : color}
                    strokeWidth={isHighlighted ? 3 : isHov ? 2 : 1}
                    rx="4"
                  />
                  {/* Open/Closed indicator */}
                  <circle cx={s.x + s.w - 8} cy={s.y + 8} r="5"
                    fill={s.open ? "#22c55e" : "#ef4444"} />
                  <text x={s.x + s.w/2} y={s.y + s.h/2 - 4} textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">{s.id}</text>
                  <text x={s.x + s.w/2} y={s.y + s.h/2 + 7} textAnchor="middle" fontSize="6" fill="white" opacity="0.9" style={{ fontSize: 6 }}>
                    {s.empresa.length > 14 ? s.empresa.slice(0,13)+"…" : s.empresa}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Tooltip on hover */}
        {hovered && (() => {
          const s = STANDS.find(x => x.id === hovered);
          if (!s) return null;
          return (
            <div className="mt-4 bg-[#1A1A2E] text-white rounded-xl p-4 text-sm flex items-center gap-4">
              <div className="w-3 h-3 rounded-full" style={{ background: CAT_COLORS[s.categoria] || "#999" }} />
              <div>
                <strong>{s.id}</strong> — {s.empresa}
                <span className="ml-3 text-white/60">{s.categoria}</span>
              </div>
              <span className={`ml-auto flex items-center gap-1 text-xs font-semibold ${s.open ? "text-green-400" : "text-red-400"}`}>
                {s.open ? "● Abierto" : "✕ Cerrado"}
              </span>
            </div>
          );
        })()}

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-3">
          {Object.entries(CAT_COLORS).map(([cat, color]) => (
            <div key={cat} className="flex items-center gap-1.5 text-xs" style={{ color: "var(--t-text-muted)" }}>
              <div className="w-3 h-3 rounded" style={{ background: color }} />
              {cat}
            </div>
          ))}
          <div className="flex items-center gap-1.5 text-xs ml-4" style={{ color: "var(--t-text-muted)" }}>
            <div className="w-3 h-3 rounded-full bg-green-500" /> Abierto
          </div>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--t-text-muted)" }}>
            <div className="w-3 h-3 rounded-full bg-red-500" /> Cerrado
          </div>
        </div>
      </div>

    </div>
  );
}

function Bioceánico() {
  const [layer, setLayer] = useState("producción");
  const layers: Record<string, { color: string; description: string; points: Array<{ x: number; y: number; label: string; detail: string }> }> = {
    "producción": {
      color: "#7209B7",
      description: "Circuito productivo: agroindustria, minería, manufactura",
      points: [
        { x: 420, y: 180, label: "São Paulo", detail: "Hub manufacturero" },
        { x: 340, y: 220, label: "Asunción", detail: "Agroindustria" },
        { x: 200, y: 260, label: "Jujuy", detail: "Litio + Agroindustria" },
        { x: 100, y: 240, label: "Antofagasta", detail: "Minería + Puerto" },
      ],
    },
    "turismo": {
      color: "#7209B7",
      description: "Ruta turística bioceánica: destinos culturales y naturales",
      points: [
        { x: 420, y: 180, label: "Iguazú", detail: "Patrimonio natural" },
        { x: 340, y: 220, label: "Asunción", detail: "Ciudad histórica" },
        { x: 200, y: 260, label: "Quebrada", detail: "Patrimonio UNESCO" },
        { x: 100, y: 240, label: "Atacama", detail: "Desierto" },
      ],
    },
    "minería": {
      color: "#1DBECB",
      description: "Corredor minero: litio, cobre, y minerales críticos",
      points: [
        { x: 200, y: 200, label: "Puna Jujeña", detail: "Litio" },
        { x: 160, y: 240, label: "Catamarca", detail: "Cobre" },
        { x: 100, y: 230, label: "Atacama", detail: "Litio + Cobre" },
        { x: 80, y: 260, label: "Antofagasta", detail: "Puerto exportación" },
      ],
    },
    "logística": {
      color: "#1DBECB",
      description: "Infraestructura vial, ferroviaria y portuaria",
      points: [
        { x: 420, y: 180, label: "Santos", detail: "Puerto Atlántico" },
        { x: 340, y: 220, label: "Asunción", detail: "Nodo logístico" },
        { x: 200, y: 260, label: "Jujuy", detail: "Paso de Jama" },
        { x: 100, y: 240, label: "Iquique", detail: "Puerto Pacífico" },
      ],
    },
  };
  const current = layers[layer];

  return (
    <div className="pt-14">
      <div className="bg-[#1A1A2E] py-14 px-4 text-center">
        <div className="font-mono-data text-[#1DBECB] text-xs uppercase tracking-widest mb-3">Geopolítica productiva</div>
        <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-4">Corredor Bioceánico</h1>
        <p className="text-[#FFFFFF]/70 text-lg">Brasil · Paraguay · Jujuy · Chile — el eje del futuro comercial sudamericano</p>
      </div>
      <AguayoDivider />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.keys(layers).map(l => (
            <button key={l} onClick={() => setLayer(l)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm capitalize transition-all border ${layer === l ? "text-white border-transparent" : "bg-white border-[#F0F0F5] text-[#4A4A4A]"}`}
              style={layer === l ? { background: current.color } : {}}>
              {l}
            </button>
          ))}
        </div>
        <p className="text-[#4A4A4A]/60 text-sm mb-6 italic">{current.description}</p>

        <div className="bg-[#F0F0F5] rounded-2xl overflow-hidden">
          <svg viewBox="0 0 520 400" className="w-full">
            {/* Ocean backgrounds */}
            <rect width="520" height="400" fill="#D4E8F0" />
            {/* Land masses (simplified) */}
            <ellipse cx="300" cy="200" rx="180" ry="160" fill="#E8D8C0" />
            <ellipse cx="420" cy="150" rx="80" ry="60" fill="#E8D8C0" />

            {/* Country labels */}
            <text x="420" y="155" textAnchor="middle" fontSize="10" fill="#4A4A4A" opacity="0.7" fontWeight="bold">BRASIL</text>
            <text x="340" y="225" textAnchor="middle" fontSize="9" fill="#4A4A4A" opacity="0.7" fontWeight="bold">PARAGUAY</text>
            <text x="200" y="265" textAnchor="middle" fontSize="9" fill="#4A4A4A" opacity="0.7" fontWeight="bold">ARGENTINA</text>
            <text x="95" y="245" textAnchor="middle" fontSize="9" fill="#4A4A4A" opacity="0.7" fontWeight="bold">CHILE</text>

            {/* Route line */}
            <polyline
              points={current.points.map(p => `${p.x},${p.y}`).join(" ")}
              fill="none"
              stroke={current.color}
              strokeWidth="3"
              strokeDasharray="8,4"
              opacity="0.9"
            />

            {/* Points */}
            {current.points.map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r="10" fill={current.color} opacity="0.2" />
                <circle cx={p.x} cy={p.y} r="5" fill={current.color} />
                <text x={p.x} y={p.y - 14} textAnchor="middle" fontSize="9" fill="#4A4A4A" fontWeight="bold">{p.label}</text>
                <text x={p.x} y={p.y - 4} textAnchor="middle" fontSize="7" fill={current.color}>{p.detail}</text>
              </g>
            ))}

            {/* Jujuy highlight */}
            <circle cx="200" cy="260" r="14" fill="none" stroke="#7209B7" strokeWidth="2" strokeDasharray="4,2" />
          </svg>
        </div>

        <div className="mt-6 grid md:grid-cols-4 gap-4">
          {current.points.map(p => (
            <div key={p.label} className="bg-white rounded-xl p-4 border border-[#F0F0F5]">
              <div className="font-display font-bold text-[#4A4A4A]">{p.label}</div>
              <div className="text-sm text-[#4A4A4A]/60 mt-1">{p.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DescubríJujuy() {
  const [region, setRegion] = useState<Region>("quebrada");
  const r = REGIONES[region];

  return (
    <div className="pt-14">
      <div className="relative overflow-hidden py-20 px-4 text-center" style={{ background: r.color }}>
        <div className="relative z-10">
          <div className="font-mono-data text-white/70 text-xs uppercase tracking-widest mb-3">Descubrí Jujuy</div>
          <h1 className="font-display text-5xl font-black text-white mb-3">{r.nombre}</h1>
          <p className="text-white/80 text-xl italic font-display">{r.subtitulo}</p>
        </div>
      </div>
      <div className="sticky top-14 z-30 bg-[#FFFFFF] border-b border-[#F0F0F5]">
        <div className="max-w-5xl mx-auto px-4 flex gap-1 py-2">
          {(Object.keys(REGIONES) as Region[]).map(reg => {
            const rg = REGIONES[reg];
            return (
              <button key={reg} onClick={() => setRegion(reg)}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${region === reg ? "text-white" : "text-[#4A4A4A]/60 hover:bg-[#F0F0F5]"}`}
                style={region === reg ? { background: rg.color } : {}}>
                {rg.nombre}
              </button>
            );
          })}
        </div>
      </div>
      <AguayoDivider thin />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <div className="overflow-hidden rounded-2xl bg-[#F0F0F5] h-64 mb-6">
              <img src={r.img} alt={r.nombre} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 border border-[#F0F0F5]">
                <div className="font-semibold text-xs uppercase tracking-wide text-[#4A4A4A]/40 mb-2">Municipios</div>
                <ul className="space-y-1">
                  {r.municipios.map(m => (
                    <li key={m} className="text-sm text-[#4A4A4A] font-medium">• {m}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-xl p-4 border border-[#F0F0F5]">
                <div className="font-semibold text-xs uppercase tracking-wide text-[#4A4A4A]/40 mb-2">Productos</div>
                <ul className="space-y-1">
                  {r.productos.map(p => (
                    <li key={p} className="text-sm" style={{ color: r.color }}>◆ {p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="space-y-5">
            <div className="bg-white rounded-xl p-6 border border-[#F0F0F5]">
              <div className="font-display text-lg font-bold text-[#4A4A4A] mb-2">🏔 Turismo</div>
              <p className="text-[#4A4A4A]/70 text-sm leading-relaxed">{r.turismo}</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-[#F0F0F5]">
              <div className="font-display text-lg font-bold text-[#4A4A4A] mb-2">🎭 Cultura</div>
              <p className="text-[#4A4A4A]/70 text-sm leading-relaxed">{r.cultura}</p>
            </div>
            <div className="rounded-xl p-6 text-white" style={{ background: r.color }}>
              <div className="font-display text-lg font-bold mb-2">Empresas de la región</div>
              <div className="space-y-2">
                {EMPRESAS.filter(e => e.region === r.nombre).map(e => (
                  <div key={e.nombre} className="flex justify-between items-center text-sm">
                    <span className="font-semibold">{e.nombre}</span>
                    <span className="text-white/70">{e.rubro}</span>
                  </div>
                ))}
                {EMPRESAS.filter(e => e.region === r.nombre).length === 0 && (
                  <p className="text-white/60 text-sm">Ver sección Explorar para más empresas de esta región.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExpoData() {
  return (
    <div className="pt-14">
      <div className="bg-[#1A1A2E] py-16 px-4 text-center">
        <div className="font-mono-data text-[#1DBECB] text-xs uppercase tracking-widest mb-3">Fuente oficial · Única y verificada</div>
        <h1 className="font-display text-5xl font-black text-white mb-3">ExpoJuy DATA</h1>
        <p className="text-[#FFFFFF]/60 max-w-xl mx-auto">Los indicadores oficiales de ExpoJuy 2026. Actualizados post-evento. Transparencia como diferencial.</p>
      </div>
      <AguayoDivider />
      <div className="py-12 px-4" style={{ background: "var(--t-bg)" }}>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
          {DATA_INDICATORS.map(d => (
            <div key={d.label} className="rounded-xl p-6 hover:shadow-md transition-shadow" style={{ background: "var(--t-card)", border: "1px solid var(--t-card-border)" }}>
              <div className="text-3xl mb-3">{d.icon}</div>
              <div className="font-display text-4xl font-black text-[#7209B7] leading-none mb-1">{d.value}</div>
              <div className="font-semibold text-sm mb-0.5" style={{ color: "var(--t-text)" }}>{d.label}</div>
              <div className="font-mono-data text-xs uppercase tracking-wide" style={{ color: "var(--t-text-muted)" }}>{d.unit}</div>
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto mt-8 bg-[#1DBECB]/10 border border-[#1DBECB]/30 rounded-xl p-5 text-center">
          <div className="font-mono-data text-[#1DBECB] text-xs uppercase tracking-widest mb-1">Nota de transparencia</div>
          <p className="text-[#4A4A4A]/70 text-sm">Todos los indicadores son publicados con fuente verificada al cierre de cada edición. Los valores pre-evento son proyecciones basadas en registros confirmados a la fecha.</p>
        </div>
      </div>
    </div>
  );
}

function Noticias() {
  const TAGS = ["Todos", "Turismo", "Recreativo", "Talleres", "Cursos", "Charlas", "Desarrollo productivo", "Internacional"];
  const [tag, setTag] = useState("Todos");

  const ALL_NEWS = [
    ...NOTICIAS,
    { id: 4, tag: "Talleres", tagColor: "bg-[#0891B2] text-white", title: "Taller de exportaciones para PYMES: cupos limitados", date: "18 ago 2026", img: "https://images.unsplash.com/photo-1599471333048-e9a5c8ceb4b1?w=600&h=380&fit=crop&auto=format", excerpt: "Capacitación gratuita para empresas del NOA con exportaciones en curso o en proyecto." },
    { id: 5, tag: "Recreativo", tagColor: "bg-[#7209B7] text-white", title: "Muestra gastronómica: los sabores de Jujuy en un solo lugar", date: "15 ago 2026", img: "https://images.unsplash.com/photo-1765567972885-9b63d0f6c7db?w=600&h=380&fit=crop&auto=format", excerpt: "Humita, locro, chicha y empanadas jujeñas serán el eje de la plaza gastronómica." },
    { id: 6, tag: "Charlas", tagColor: "bg-[#0891B2] text-white", title: "Charla abierta: El litio y la soberanía tecnológica argentina", date: "12 ago 2026", img: "https://images.unsplash.com/photo-1765567972996-92bf41b4b960?w=600&h=380&fit=crop&auto=format", excerpt: "Expertos del CONICET debatirán sobre el rol del litio en la transición energética global." },
  ];

  const filtered = ALL_NEWS.filter(n => tag === "Todos" || n.tag === tag);

  return (
    <div className="pt-14">
      <div className="bg-[#7209B7] py-14 px-4 text-center">
        <div className="font-mono-data text-white/70 text-xs uppercase tracking-widest mb-3">Sala de prensa</div>
        <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-3">Noticias</h1>
      </div>
      <AguayoDivider />
      <div className="max-w-7xl mx-auto px-4 py-10" style={{ background: "var(--t-bg)" }}>
        <div className="flex flex-wrap gap-2 mb-8">
          {TAGS.map(t => (
            <button key={t} onClick={() => setTag(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${tag === t ? "bg-[#7209B7] text-white border-[#7209B7]" : ""}`}
              style={tag !== t ? { borderColor: "var(--t-card-border)", color: "var(--t-text-muted)" } : {}}>
              {t}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map(n => (
            <article key={n.id} className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group" style={{ background: "var(--t-card)", border: "1px solid var(--t-card-border)" }}>
              <div className="overflow-hidden h-48" style={{ background: "var(--t-surface)" }}>
                <img src={n.img} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded mb-3 ${n.tagColor}`}>{n.tag}</span>
                <h3 className="font-display font-bold text-[#4A4A4A] text-lg leading-snug mb-2">{n.title}</h3>
                <p className="text-[#4A4A4A]/60 text-sm">{n.excerpt}</p>
                <div className="font-mono-data text-xs text-[#4A4A4A]/40 mt-3">{n.date}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── App ────────────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState<Section>("inicio");
  const [darkMode, setDarkMode] = useState(true);

  const sections: Record<Section, React.ReactNode> = {
    inicio: <Inicio setActive={setActive} />,
    sobre: <Sobre />,
    explorar: <Explorar />,
    agenda: <Agenda />,
    negocios: <Negocios />,
    plano: <Plano />,
    "bioceánico": <Bioceánico />,
    "descubrí": <DescubríJujuy />,
    data: <ExpoData />,
    noticias: <Noticias />,
  };

  return (
    <div className={`min-h-full ${darkMode ? "dark" : ""}`} style={{ background: "var(--t-bg)" }}>
      <NavBar active={active} setActive={setActive} darkMode={darkMode} setDarkMode={setDarkMode} />
      <main>{sections[active]}</main>
      <footer className="text-[#FFFFFF]" style={{ background: "var(--t-footer-bg)" }}>
        <AguayoDivider />
        <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
          <div>
            <div className="font-display text-2xl font-black mb-2">
              <span className="text-[#7209B7]">EXPO</span>JUY<span className="text-[#1DBECB] text-sm ml-1">2026</span>
            </div>
            <p className="text-[#FFFFFF]/50 text-sm">12–15 Octubre 2026 · San Salvador de Jujuy, Argentina</p>
          </div>
          {[
            { title: "Secciones", links: [["inicio","Inicio"],["explorar","Explorar"],["agenda","Agenda"],["negocios","Ronda de Negocios"]] as [Section, string][] },
            { title: "Territorio", links: [["descubrí","Descubrí Jujuy"],["plano","Plano interactivo"],["bioceánico","Corredor Bioceánico"],["data","ExpoJuy DATA"]] as [Section, string][] },
            { title: "Prensa", links: [["noticias","Noticias"],["sobre","Sobre ExpoJuy"]] as [Section, string][] },
          ].map(col => (
            <div key={col.title}>
              <div className="font-semibold text-xs uppercase tracking-widest text-[#FFFFFF]/40 mb-3">{col.title}</div>
              <ul className="space-y-2">
                {col.links.map(([key, label]) => (
                  <li key={key}>
                    <button onClick={() => setActive(key)} className="text-[#FFFFFF]/70 hover:text-[#1DBECB] text-sm transition-colors text-left">{label}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[#FFFFFF]/30">
          <span>© 2026 ExpoJuy. Todos los derechos reservados.</span>
          <span className="flex gap-4">
            <span className="hover:text-[#1DBECB] cursor-pointer transition-colors">Términos</span>
            <span className="hover:text-[#1DBECB] cursor-pointer transition-colors">Privacidad</span>
            <span className="hover:text-[#1DBECB] cursor-pointer transition-colors">Accesibilidad</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
