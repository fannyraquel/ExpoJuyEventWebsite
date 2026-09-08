import React from "react";
import AguayoDivider from "@components/common/AguayoDivider";

export interface BioceanicoHeaderProps {
  badgeText?: string;
  title?: string;
  subtitle?: string;
}

export default function BioceanicoHeader({
  badgeText = "Geopolítica productiva",
  title = "Corredor Bioceánico",
  subtitle = "Brasil · Paraguay · Jujuy · Chile — el eje del futuro comercial sudamericano",
}: BioceanicoHeaderProps) {
  return (
    <>
      <div className="bg-[#1A1A2E]/85 dark:bg-[#0D0D1A]/95 py-14 px-4 text-center backdrop-blur-sm transition-colors duration-300">
        <div className="font-mono-data text-[#1DBECB] text-xs uppercase tracking-widest mb-3">
          {badgeText}
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
          {title}
        </h1>
        <p className="text-white/80 dark:text-white/70 text-lg max-w-3xl mx-auto">
          {subtitle}
        </p>
      </div>
      <AguayoDivider />
    </>
  );
}
