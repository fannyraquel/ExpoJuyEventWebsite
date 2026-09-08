import React from "react";
import { Empresa } from "@appTypes/domain.types";

export interface DescubriJujuyEmpresasProps {
  regionNombre: string;
  empresas: Empresa[];
}

export default function DescubriJujuyEmpresas({
  regionNombre,
  empresas,
}: DescubriJujuyEmpresasProps) {
  return (
    <section className="space-y-6 pt-6">
      <div className="flex flex-col justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4 sm:flex-row sm:items-baseline transition-colors">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#7209B7] dark:text-[#9D4EDD]">
            Red Productiva
          </span>
          <h3 className="mt-1 font-serif text-2xl text-slate-900 dark:text-white md:text-3xl">
            Empresas &amp; Productores de {regionNombre}
          </h3>
        </div>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {empresas.length} expositores registrados
        </span>
      </div>

      {empresas.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center text-xs text-slate-400 dark:text-slate-500 transition-colors">
          No hay empresas cargadas específicamente bajo esta región. Podés consultar el listado general en la sección Explorar.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {empresas.map((empresa, idx) => (
            <div
              key={empresa.id || empresa.nombre}
              className="group rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-[#1A1A2E] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1DBECB]/40 hover:shadow-xl"
            >
              <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-2 text-base font-bold text-slate-900 dark:text-slate-100 transition-colors group-hover:text-[#7209B7] dark:group-hover:text-[#9D4EDD]">
                {empresa.nombre}
              </h4>
              <p className="mt-1 text-xs font-semibold text-[#1DBECB]">
                {empresa.rubro}
              </p>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-3 text-[11px] text-slate-400 dark:text-slate-400">
                <span>Stand acreditado</span>
                <span className="font-bold text-[#7209B7] dark:text-[#9D4EDD] group-hover:underline">
                  Ver perfil →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
