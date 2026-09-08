import React from "react";
import { Noticia, Section } from "../../types/domain.types";

export interface NoticiasDestacadasData {
  tag: string;
  title: string;
  description: string;
  buttonText: string;
  buttonSection: Section;
  badgeLabel: string;
  readMoreText: string;
  emptyMessage: string;
}

interface NoticiasDestacadasSectionProps {
  data: NoticiasDestacadasData;
  noticias: Noticia[];
  cargando: boolean;
  onNavigate: (section: Section) => void;
}

export default function NoticiasDestacadasSection({
  data,
  noticias,
  cargando,
  onNavigate,
}: NoticiasDestacadasSectionProps) {
  return (
    <section className="relative mx-auto max-w-7xl px-5 py-8 md:px-8">
      <div className="pointer-events-none absolute top-0 right-0 text-8xl font-black text-[#A881FC]/30 dark:text-[#A881FC]/15">
        ✳
      </div>

      {/* Encabezado */}
      <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1DBECB]">
            {data.tag}
          </span>

          <h2 className="mt-1 text-3xl font-black tracking-tight text-[#7209B7] dark:text-[#A881FC] md:text-5xl transition-colors">
            {data.title}
          </h2>

          <p className="mt-2 text-sm text-[var(--t-text-muted)] transition-colors">{data.description}</p>
        </div>

        <button
          onClick={() => onNavigate(data.buttonSection)}
          className="self-start cursor-pointer text-xs font-bold text-[#7209B7] dark:text-[#A881FC] transition hover:text-[#1DBECB] md:self-auto"
        >
          {data.buttonText}
        </button>
      </div>

      {/* Listado de noticias */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cargando ? (
          [1, 2, 3, 4].map((numero) => (
            <div
              key={numero}
              className="h-[330px] animate-pulse rounded-[1.5rem] bg-[var(--t-surface)]"
            />
          ))
        ) : noticias.length > 0 ? (
          noticias.map((noticia, indice) => (
            <article
              key={noticia.id || indice}
              className="group relative flex min-h-[330px] cursor-pointer flex-col overflow-hidden rounded-[1.5rem] bg-[var(--t-surface)] hover:bg-[var(--t-card)] border border-[var(--t-card-border)] shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Imagen de la noticia */}
              <div className="relative h-[190px] overflow-hidden">
                {noticia.img ? (
                  <img
                    src={noticia.img}
                    alt={noticia.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#A881FC]/20 text-5xl">
                    📰
                  </div>
                )}

                <div className="absolute top-4 left-4 rounded-full bg-[var(--t-card)]/90 px-3 py-1 text-[9px] font-black uppercase tracking-wider text-[#7209B7] dark:text-[#A881FC] backdrop-blur">
                  {data.badgeLabel}
                </div>
              </div>

              {/* Información de la noticia */}
              <div className="flex flex-1 flex-col p-5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1DBECB]">
                  {noticia.date || "Reciente"}
                </span>

                <h3 className="mt-2 line-clamp-3 text-base font-black leading-tight text-[var(--t-text)] transition group-hover:text-[#7209B7] dark:group-hover:text-[#A881FC]">
                  {noticia.title || `Novedad #${indice + 1}`}
                </h3>

                <div className="mt-auto pt-4">
                  <span className="text-xs font-bold text-[#7209B7] dark:text-[#A881FC]">
                    {data.readMoreText}
                  </span>
                  <span className="ml-2 text-[#1DBECB] transition-all group-hover:ml-3">
                    →
                  </span>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-1 rounded-[1.5rem] border border-dashed border-[var(--t-card-border)] py-14 text-center text-sm text-[var(--t-text-muted)] sm:col-span-2 lg:col-span-4">
            {data.emptyMessage}
          </div>
        )}
      </div>
    </section>
  );
}
