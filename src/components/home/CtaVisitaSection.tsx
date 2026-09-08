import React from "react";
import { Section } from "../../types/domain.types";

export interface CtaVisitaData {
  tag: string;
  titleMain: string;
  titleHighlight: string;
  description: string;
  buttonText: string;
  buttonSection: Section;
}

interface CtaVisitaSectionProps {
  data: CtaVisitaData;
  onNavigate: (section: Section) => void;
}

export default function CtaVisitaSection({
  data,
  onNavigate,
}: CtaVisitaSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-8 pb-16 md:px-8">
      <div className="relative flex min-h-[280px] items-center overflow-hidden rounded-[2rem] border border-[#A881FC]/20 dark:border-white/10 bg-[#F5F1FF] dark:bg-[#1C1534] transition-colors duration-300">
        {/* Decoración de fondo */}
        <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-[#A881FC]/25 dark:bg-[#A881FC]/15" />
        <div className="absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-[#1DBECB]/20 dark:bg-[#1DBECB]/15" />
        <div className="absolute top-10 right-[28%] text-6xl text-[#7209B7]/20 dark:text-[#A881FC]/20">✳</div>

        <div className="relative z-10 grid w-full items-center gap-6 p-7 md:grid-cols-12 md:p-10">
          <div className="md:col-span-8">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#1DBECB]">
              {data.tag}
            </span>

            <h2 className="mt-2 text-4xl font-black leading-[0.9] tracking-tight text-[#7209B7] dark:text-[#A881FC] md:text-6xl transition-colors">
              {data.titleMain}
              <span className="block text-[#1DBECB]">{data.titleHighlight}</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--t-text-muted)] transition-colors">
              {data.description}
            </p>
          </div>

          <div className="flex md:col-span-4 md:justify-end">
            <button
              onClick={() => onNavigate(data.buttonSection)}
              className="group relative inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-[#7209B7] px-7 py-4 text-sm font-black text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl md:w-auto"
            >
              {data.buttonText}
              <span className="transition group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
