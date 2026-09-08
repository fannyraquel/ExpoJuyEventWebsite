import React from "react";

export default function FooterDecorativoSection() {
  return (
    <div className="relative h-8 overflow-hidden bg-[var(--t-bg)] transition-colors duration-300">
      <div className="absolute -bottom-[45px] -left-5 h-28 w-28 rounded-full bg-[#7209B7]" />
      <div className="absolute -right-5 -bottom-[45px] h-28 w-28 rounded-full bg-[#1DBECB]" />
    </div>
  );
}
