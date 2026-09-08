import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { LANGS } from "../config/theme.config";

export type Language = keyof typeof LANGS;

const translations: Record<Language, Record<string, string>> = {
  ES: {
    home: "Inicio",
    about: "Sobre ExpoJuy 2026",
    exhibitors: "Expositores",
    agenda: "Agenda",
    news: "Noticias",
    map: "Plano",
    faq: "Preguntas frecuentes",
    contact: "Contacto",
    explore: "Explorar",
    search: "Buscar",
    featuredNews: "Noticias destacadas",
    upcomingActivities: "Próximas actividades",
    officialSponsors: "Sponsors Oficiales 2026",
    socialNetworks: "Redes sociales",
    contactUs: "Contactanos",
    seeAll: "Ver todas →",
    fullAgenda: "Ver agenda completa →",
    language: "Seleccionar idioma",
    darkMode: "Modo oscuro",
    lightMode: "Modo claro",
  },
  EN: {
    home: "Home",
    about: "About ExpoJuy 2026",
    exhibitors: "Exhibitors",
    agenda: "Schedule",
    news: "News",
    map: "Venue map",
    faq: "Frequently asked questions",
    contact: "Contact",
    explore: "Explore",
    search: "Search",
    featuredNews: "Featured news",
    upcomingActivities: "Upcoming activities",
    officialSponsors: "Official sponsors 2026",
    socialNetworks: "Social media",
    contactUs: "Contact us",
    seeAll: "See all →",
    fullAgenda: "View full schedule →",
    language: "Select language",
    darkMode: "Dark mode",
    lightMode: "Light mode",
  },
  PT: {
    home: "Início",
    about: "Sobre a ExpoJuy 2026",
    exhibitors: "Expositores",
    agenda: "Agenda",
    news: "Notícias",
    map: "Mapa",
    faq: "Perguntas frequentes",
    contact: "Contato",
    explore: "Explorar",
    search: "Buscar",
    featuredNews: "Notícias em destaque",
    upcomingActivities: "Próximas atividades",
    officialSponsors: "Patrocinadores oficiais 2026",
    socialNetworks: "Redes sociais",
    contactUs: "Fale conosco",
    seeAll: "Ver todas →",
    fullAgenda: "Ver agenda completa →",
    language: "Selecionar idioma",
    darkMode: "Modo escuro",
    lightMode: "Modo claro",
  },
  FR: {
    home: "Accueil",
    about: "À propos d'ExpoJuy 2026",
    exhibitors: "Exposants",
    agenda: "Programme",
    news: "Actualités",
    map: "Plan",
    faq: "Questions fréquentes",
    contact: "Contact",
    explore: "Explorer",
    search: "Rechercher",
    featuredNews: "Actualités à la une",
    upcomingActivities: "Activités à venir",
    officialSponsors: "Sponsors officiels 2026",
    socialNetworks: "Réseaux sociaux",
    contactUs: "Nous contacter",
    seeAll: "Voir toutes →",
    fullAgenda: "Voir le programme complet →",
    language: "Choisir la langue",
    darkMode: "Mode sombre",
    lightMode: "Mode clair",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("expojuy_language") as Language | null;
    return saved && saved in LANGS ? saved : "ES";
  });

  useEffect(() => {
    localStorage.setItem("expojuy_language", language);
    document.documentElement.lang = language.toLowerCase();
  }, [language]);

  const setLanguage = (nextLanguage: Language) => setLanguageState(nextLanguage);
  const t = (key: string) => translations[language][key] ?? translations.ES[key] ?? key;

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage debe usarse dentro de un LanguageProvider");
  }
  return context;
}
