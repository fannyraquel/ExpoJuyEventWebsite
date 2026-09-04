import { useState, useEffect } from "react";
import AguayoDivider from "../../components/common/AguayoDivider";
import { noticiasService } from "../../api/services/noticiasService";
import { Noticia } from "../../types/domain.types";

export default function NoticiasPage() {
  const TAGS = ["Todos", "Turismo", "Recreativo", "Talleres", "Cursos", "Charlas", "Desarrollo productivo", "Internacional"];
  const [tag, setTag] = useState("Todos");
  const [noticias, setNoticias] = useState<Noticia[]>([]);

  useEffect(() => {
    noticiasService.getNoticias(tag).then((res) => {
      if (res.success && res.data) {
        setNoticias(res.data);
      }
    });
  }, [tag]);

  return (
    <div className="pt-14">
      <div className="bg-[#7209B7] py-14 px-4 text-center">
        <div className="font-mono-data text-white/70 text-xs uppercase tracking-widest mb-3">Sala de prensa</div>
        <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-3">Noticias</h1>
      </div>
      <AguayoDivider />
      <div className="max-w-7xl mx-auto px-4 py-10" style={{ background: "var(--t-bg)" }}>
        <div className="flex flex-wrap gap-2 mb-8">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                tag === t ? "bg-[#7209B7] text-white border-[#7209B7]" : ""
              }`}
              style={tag !== t ? { borderColor: "var(--t-card-border)", color: "var(--t-text-muted)" } : {}}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {noticias.map((n) => (
            <article
              key={n.id}
              className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
              style={{ background: "var(--t-card)", border: "1px solid var(--t-card-border)" }}
            >
              <div className="overflow-hidden h-48" style={{ background: "var(--t-surface)" }}>
                <img
                  src={n.img}
                  alt={n.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded mb-3 ${n.tagColor}`}>{n.tag}</span>
                <h3 className="font-display font-bold text-[#4A4A4A] dark:text-white text-lg leading-snug mb-2">{n.title}</h3>
                <p className="text-[#4A4A4A]/60 dark:text-white/60 text-sm">{n.excerpt}</p>
                <div className="font-mono-data text-xs text-[#4A4A4A]/40 dark:text-white/40 mt-3">{n.date}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
