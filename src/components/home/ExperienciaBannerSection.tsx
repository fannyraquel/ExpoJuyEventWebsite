import React from "react";
import { Section } from "../../types/domain.types";

export interface ExperienciaBannerData {
  tag: string;
  title: string;
  description: string;
  buttonText: string;
  buttonSection: Section;
}

interface ExperienciaBannerSectionProps {
  data: ExperienciaBannerData;
  onNavigate: (section: Section) => void;
}

export default function ExperienciaBannerSection({
  data,
  onNavigate,
}: ExperienciaBannerSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-6 md:px-8">
      <div className="rounded-[2rem] border border-[#7209B7]/10 bg-[#1A1A2E] p-6 text-white shadow-xl md:flex md:items-center md:justify-between md:p-8">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#1DBECB]">
            {data.tag}
          </span>
          <h2 className="mt-2 text-2xl font-black md:text-3xl">{data.title}</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/60">
            {data.description}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate(data.buttonSection)}
          className="mt-5 inline-flex shrink-0 items-center justify-center rounded-full border border-[#1DBECB] px-6 py-3 text-sm font-bold text-[#1DBECB] transition hover:bg-[#1DBECB] hover:text-[#1A1A2E] md:mt-0"
        >
          {data.buttonText}
        </button>
      </div>
    </section>
  );
}
