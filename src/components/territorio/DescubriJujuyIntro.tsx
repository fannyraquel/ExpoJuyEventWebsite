import React from "react";

export default function DescubriJujuyIntro() {
  return (
    <div className="grid grid-cols-1 items-end gap-6 border-b border-slate-200/80 dark:border-slate-800 pb-10 md:grid-cols-12 transition-colors">
      <div className="md:col-span-7">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1DBECB]">
          Región Productiva &amp; Turística
        </span>
        <h2 className="mt-2 font-serif text-3xl font-normal leading-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
          Paisajes ancestrales con <br className="hidden sm:inline" />
          <span className="font-light italic text-[#7209B7] dark:text-[#9D4EDD]">
            futuro de desarrollo.
          </span>
        </h2>
      </div>
      <div className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 sm:text-sm md:col-span-5">
        Conocé de cerca la riqueza cultural, los municipios y la matriz productiva que integran esta región icónica de nuestra provincia en el marco de la ExpoJuy 2026.
      </div>
    </div>
  );
}
