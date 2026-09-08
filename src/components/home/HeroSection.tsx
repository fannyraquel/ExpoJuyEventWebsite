import React from "react";
import jujuyMask from "@assets/jujuy.png";
import logoExpojuy from "@assets/EXPOJUY_Logo2026/RGB/expojuy26_horizontal.png";
import heroVideo from "@assets/noname.mp4";
import heroImg from "@assets/67124e485ddd2.jpg";
import videoMundo from "@assets/mundo.mp4";
import { Section } from "@appTypes/domain.types";

export interface HeroData {
  badge: string;
  editionTagline: {
    text1: string;
    text2: string;
  };
  logoAlt: string;
  description: string;
  buttons: Array<{
    text: string;
    section: Section;
    arrow?: string;
  }>;
  stats: Array<{
    valor: string;
    etiqueta: string;
    color: string;
  }>;
  badgeVideoText: string;
  badgeImageText: string;
}

interface HeroSectionProps {
  data: HeroData;
  mostrarVideo: boolean;
  mostrarFecha: boolean;
  mundoVideoRef: React.RefObject<HTMLVideoElement | null>;
  onNavigate: (section: Section) => void;
}

export function DatoHero({
  valor,
  etiqueta,
  color,
}: {
  valor: string;
  etiqueta: string;
  color: string;
}) {
  return (
    <div>
      <span className={`block text-xl font-black ${color}`}>{valor}</span>
      <span className="text-[10px] uppercase tracking-wider text-[var(--t-text-muted)]">
        {etiqueta}
      </span>
    </div>
  );
}

export default function HeroSection({
  data,
  mostrarVideo,
  mostrarFecha,
  mundoVideoRef,
  onNavigate,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[var(--t-bg)]">
      {/* FONDO HERO COMPLETO — VIDEO DEL MUNDO PANORÁMICO */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none -z-0 overflow-hidden">
        <video
          ref={mundoVideoRef}
          src={videoMundo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center scale-105 opacity-[0.20] dark:opacity-[0.35]"
        />

        <div
          className="absolute inset-0 bg-gradient-to-b from-[var(--t-bg)]/40 via-[var(--t-bg)]/70 to-[var(--t-bg)] transition-colors duration-300"
          aria-hidden="true"
        />

        <div
          className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#7209B7]/10 dark:bg-[#7209B7]/25 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#1DBECB]/10 dark:bg-[#1DBECB]/25 blur-3xl"
          aria-hidden="true"
        />
      </div>

      {/* Elementos decorativos del fondo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#7209B7] opacity-[0.08] dark:opacity-[0.18] blur-3xl" />
        <div className="absolute top-[35%] -left-40 h-[380px] w-[380px] rounded-full bg-[#1DBECB] opacity-[0.10] dark:opacity-[0.20] blur-3xl" />

        <div className="absolute top-32 left-[7%] h-3 w-3 rounded-full bg-[#1DBECB]" />
        <div className="absolute top-44 left-[9%] h-2 w-2 rounded-full bg-[#A881FC]" />
        <div className="absolute right-[8%] bottom-36 h-3 w-3 rounded-full bg-[#7209B7]" />

        <div className="absolute top-[18%] right-[42%] text-3xl text-[#1DBECB]">✦</div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-6 md:px-8 md:pt-8">
        <div className="mx-auto mb-2 flex w-fit items-center gap-2 rounded-full border border-[#7209B7]/15 dark:border-[#A881FC]/30 bg-[var(--t-card)]/80 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#7209B7] dark:text-[#A881FC] shadow-sm backdrop-blur-md transition-colors">
          <span className="h-2 w-2 rounded-full bg-[#1DBECB] shadow-[0_0_0_4px_rgba(29,190,203,0.15)]" />
          {data.badge}
        </div>
        <div className="grid min-h-[600px] items-center gap-8 py-10 md:py-14 lg:grid-cols-12 lg:gap-4">
          {/* IDENTIDAD VISUAL DE JUJUY */}
          <div className="relative order-2 flex justify-center lg:order-1 lg:col-span-6 lg:justify-start">
            <div className="relative z-10 w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] md:w-[520px] md:h-[520px] lg:w-[580px] lg:h-[580px]">
              <div
                className="absolute inset-0"
                style={{
                  WebkitMaskImage: `url(${jujuyMask})`,
                  maskImage: `url(${jujuyMask})`,
                  WebkitMaskSize: "contain",
                  maskSize: "cover",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                }}
              >
                <img
                  src={heroImg}
                  alt="ExpoJuy - Jujuy"
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${mostrarVideo ? "opacity-0" : "opacity-100"
                    }`}
                />

                <video
                  src={heroVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${mostrarVideo ? "opacity-100" : "opacity-0"
                    }`}
                />
              </div>

              <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-[var(--t-card)]/90 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-[var(--t-text)] shadow-lg backdrop-blur-md transition-colors">
                <span
                  className={`h-2 w-2 rounded-full ${mostrarVideo ? "animate-pulse bg-[#1DBECB]" : "bg-[#7209B7]"
                    }`}
                />
                {mostrarVideo ? data.badgeVideoText : data.badgeImageText}
              </div>
            </div>
          </div>

          {/* MENSAJE PRINCIPAL */}
          <div className="order-1 flex justify-center lg:order-2 lg:col-span-6">
            <div className="flex w-full max-w-[650px] flex-col items-center text-center">
              {/* Etiqueta dinámica con giro y fecha */}
              <div className="mb-5 flex w-fit items-center gap-2 rounded-full border border-[#1DBECB]/25 bg-[#1DBECB]/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#7209B7] dark:text-[#A881FC] md:text-xs shadow-sm backdrop-blur-sm transition-all duration-300">
                <span className="h-2 w-2 rounded-full bg-[#1DBECB] animate-pulse shrink-0" />

                <div className="relative h-4 min-w-[140px] overflow-hidden">
                  <span
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-700 transform ${mostrarFecha
                        ? "-translate-y-full opacity-0 scale-95"
                        : "translate-y-0 opacity-100 scale-100"
                      }`}
                  >
                    {data.editionTagline.text1}
                  </span>

                  <span
                    className={`absolute inset-0 flex items-center justify-center whitespace-nowrap transition-all duration-700 transform text-[#1DBECB] font-extrabold ${mostrarFecha
                        ? "translate-y-0 opacity-100"
                        : "translate-y-full opacity-0"
                      }`}
                  >
                    {data.editionTagline.text2}
                  </span>
                </div>
              </div>

              {/* Logo principal con halo luminoso */}
              <div className="relative mb-6 w-full flex justify-center">

                {/* Halo principal */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    left-[42%]
                    top-[55%]
                    -z-10
                    h-[35%]
                    w-[35%]
                    rounded-full
                    bg-[#1DBECB]/15
                    blur-[60px]
                    dark:bg-[#1DBECB]/20
                  "
                />                

                {/* Luz turquesa secundaria */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    left-[35%]
                    top-[45%]
                    -z-10
                    h-[45%]
                    w-[45%]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-[#1DBECB]/10
                    blur-3xl
                    dark:bg-[#1DBECB]/15
                  "
                  aria-hidden="true"
                />

                <img
                  src={logoExpojuy}
                  alt={data.logoAlt}
                  className="
                    relative
                    z-10
                    h-auto
                    w-[90%]
                    sm:w-[95%]
                    lg:w-full
                    max-w-[640px]
                    object-contain

                    transition-all
                    duration-500

                    dark:brightness-125
                    dark:contrast-125
                    dark:saturate-125
                    dark:mix-blend-screen
                    dark:drop-shadow-[0_0_10px_rgba(168,129,252,0.25)]
                    dark:drop-shadow-[0_0_25px_rgba(29,190,203,0.12)]
                  "
                />

              </div>              

              <p className="mb-6 w-full max-w-lg text-center text-sm leading-relaxed text-[var(--t-text-muted)] md:text-base transition-colors">
                {data.description}
              </p>

              {/* Botones principales */}
              <div className="mt-7 flex flex-wrap items-center gap-3">
                {data.buttons.map((btn, idx) => (
                  <button
                    key={idx}
                    onClick={() => onNavigate(btn.section)}
                    className="group inline-flex cursor-pointer items-center gap-3 rounded-full bg-[#7209B7] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#5f0799] hover:shadow-xl"
                  >
                    {btn.text}
                    {btn.arrow && (
                      <span className="transition group-hover:translate-x-1">
                        {btn.arrow}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Resumen numérico */}
              <div className="mt-8 flex flex-wrap gap-5 border-t border-[var(--t-card-border)] pt-6 transition-colors">
                {data.stats.map((stat, idx) => (
                  <DatoHero
                    key={idx}
                    valor={stat.valor}
                    etiqueta={stat.etiqueta}
                    color={stat.color}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
