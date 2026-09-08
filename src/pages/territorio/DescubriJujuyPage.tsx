import { useState } from "react";
import AguayoDivider from "../../components/common/AguayoDivider";
import { REGIONES } from "../../data/regiones.data";
import { EMPRESAS } from "../../data/empresas.data";
import { Region } from "../../types/domain.types";

export default function DescubriJujuyPage() {
  const [region, setRegion] = useState<Region>("quebrada");
  const [tabActiva, setTabActiva] = useState<"turismo" | "cultura" | "municipios">("turismo");

  const r = REGIONES[region];
  const empresasRegion = EMPRESAS.filter((e) => e.region === r.nombre);

  return (
    <div className="min-h-screen bg-[#FAF9F5] font-sans text-slate-800 selection:bg-[#1DBECB]/20">
      <section className="relative flex h-[82vh] min-h-[580px] w-full flex-col justify-between overflow-hidden px-6 pb-14 pt-24 md:px-12">
        <div className="absolute inset-0 z-0">
          <img src={r.img} alt={r.nombre} className="h-full w-full scale-105 object-cover object-center transition-all duration-1000 ease-out" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl space-y-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-white backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-ping rounded-full bg-[#1DBECB]" />
            Territorio &amp; Identidad • Jujuy 2026
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl space-y-4 text-center">
          <h1 className="font-serif text-5xl font-normal uppercase tracking-tight text-white drop-shadow-lg sm:text-6xl md:text-8xl">{r.nombre}</h1>
          <p className="mx-auto max-w-2xl text-sm font-light italic leading-relaxed text-white/80 sm:text-base md:text-lg">"{r.subtitulo}"</p>
        </div>

        <div className="relative z-20 mx-auto w-full max-w-3xl translate-y-20">
          <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-black/5 bg-white/95 p-2 shadow-2xl backdrop-blur-xl sm:rounded-full">
            {(Object.keys(REGIONES) as Region[]).map((reg) => {
              const activa = region === reg;
              return (
                <button
                  key={reg}
                  onClick={() => setRegion(reg)}
                  className={`min-w-[120px] flex-1 cursor-pointer rounded-full px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    activa ? "scale-100 bg-[#7209B7] text-white shadow-lg shadow-[#7209B7]/35" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {REGIONES[reg].nombre}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="h-16 md:h-20" />

      <main className="mx-auto max-w-6xl space-y-16 px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 items-end gap-6 border-b border-slate-200/80 pb-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1DBECB]">Región Productiva &amp; Turística</span>
            <h2 className="mt-2 font-serif text-3xl font-normal leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              Paisajes ancestrales con <br className="hidden sm:inline" />
              <span className="font-light italic text-[#7209B7]">futuro de desarrollo.</span>
            </h2>
          </div>
          <div className="text-xs leading-relaxed text-slate-600 sm:text-sm md:col-span-5">
            Conocé de cerca la riqueza cultural, los municipios y la matriz productiva que integran esta región icónica de nuestra provincia en el marco de la ExpoJuy 2026.
          </div>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-[#111827] p-8 text-white shadow-2xl md:p-10 lg:col-span-5">
            <div className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-[#7209B7]/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 rounded-full bg-[#1DBECB]/25 blur-3xl" />
            <div className="relative z-10 space-y-6">
              <div className="inline-flex rounded-full border border-white/10 bg-white/10 p-1">
                {(["turismo", "cultura", "municipios"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setTabActiva(tab)}
                    className={`cursor-pointer rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                      tabActiva === tab ? "bg-[#1DBECB] text-slate-900 shadow-sm" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="min-h-[160px] space-y-3">
                {tabActiva === "turismo" && (
                  <div>
                    <span className="font-mono text-[11px] uppercase text-[#1DBECB]">Atractivos</span>
                    <h3 className="mb-2 mt-1 text-xl font-bold">Circuitos &amp; Geografía</h3>
                    <p className="text-xs font-light leading-relaxed text-slate-300 sm:text-sm">{r.turismo}</p>
                  </div>
                )}
                {tabActiva === "cultura" && (
                  <div>
                    <span className="font-mono text-[11px] uppercase text-[#1DBECB]">Tradición</span>
                    <h3 className="mb-2 mt-1 text-xl font-bold">Fiestas &amp; Expresiones</h3>
                    <p className="text-xs font-light leading-relaxed text-slate-300 sm:text-sm">{r.cultura}</p>
                  </div>
                )}
                {tabActiva === "municipios" && (
                  <div>
                    <span className="font-mono text-[11px] uppercase text-[#1DBECB]">Localidades</span>
                    <h3 className="mb-2 mt-1 text-xl font-bold">Comunidades Integradas</h3>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {r.municipios.map((m) => <span key={m} className="rounded-lg bg-white/10 px-2.5 py-1 text-xs text-white/90">{m}</span>)}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="relative z-10 mt-6 border-t border-white/10 pt-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#1DBECB]">Producción Típica Regional</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {r.productos.map((p) => <span key={p} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">◆ {p}</span>)}
              </div>
            </div>
          </div>

          <div className="group relative min-h-[380px] overflow-hidden rounded-3xl bg-slate-100 shadow-2xl lg:col-span-7">
            <img src={r.img} alt={`Paisaje de ${r.nombre}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
              <div><span className="font-mono text-[11px] uppercase tracking-widest text-[#1DBECB]">Registro Oficial</span><p className="font-serif text-base font-bold">{r.nombre} • Jujuy</p></div>
              <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold backdrop-blur-md">Edición 2026</span>
            </div>
          </div>
        </div>

        <section className="space-y-6 pt-6">
          <div className="flex flex-col justify-between gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-baseline">
            <div><span className="text-xs font-bold uppercase tracking-wider text-[#7209B7]">Red Productiva</span><h3 className="mt-1 font-serif text-2xl text-slate-900 md:text-3xl">Empresas &amp; Productores de {r.nombre}</h3></div>
            <span className="text-xs font-medium text-slate-500">{empresasRegion.length} expositores registrados</span>
          </div>
          {empresasRegion.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-xs text-slate-400">No hay empresas cargadas específicamente bajo esta región. Podés consultar el listado general en la sección Explorar.</div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {empresasRegion.map((e, idx) => (
                <div key={e.nombre} className="group rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1DBECB]/40 hover:shadow-xl">
                  <span className="font-mono text-[11px] text-slate-400">0{idx + 1}</span>
                  <h4 className="mt-2 text-base font-bold text-slate-900 transition-colors group-hover:text-[#7209B7]">{e.nombre}</h4>
                  <p className="mt-1 text-xs font-semibold text-[#1DBECB]">{e.rubro}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] text-slate-400"><span>Stand acreditado</span><span className="font-bold text-[#7209B7] group-hover:underline">Ver perfil →</span></div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <div className="mt-16"><AguayoDivider /></div>
    </div>
  );
}
