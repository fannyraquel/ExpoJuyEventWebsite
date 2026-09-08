import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { LANGS } from "../config/theme.config";

export type Language = keyof typeof LANGS;

// Diccionario de traducciones personalizadas para elementos UI clave
const translations: Record<Language, Record<string, string>> = {
  ES: {
    home: "Inicio",
    about: "Sobre ExpoJuy 2026",
    exhibitors: "Expositores",
    agenda: "Agenda",
    news: "Noticias",
    map: "Plano del Predio",
    faq: "Preguntas Frecuentes",
    contact: "Contacto",
    explore: "Explorar",
    b2b: "Ronda B2B",
    search: "Buscar",
    featuredNews: "Noticias Destacadas",
    upcomingActivities: "Próximas Actividades",
    officialSponsors: "Sponsors Oficiales 2026",
    socialNetworks: "Redes Sociales",
    contactUs: "Contactanos",
    seeAll: "Ver todas →",
    fullAgenda: "Ver agenda completa →",
    language: "Seleccionar Idioma",
    darkMode: "Modo Oscuro",
    lightMode: "Modo Claro",
    connectB2B: "Conectar B2B",
    registeredCompany: "Empresa Registrada",
    accreditedExhibitor: "Expositor Acreditado",
    stands: "Stands & Espacios",
  },
  EN: {
    home: "Home",
    about: "About ExpoJuy 2026",
    exhibitors: "Exhibitors",
    agenda: "Schedule",
    news: "News",
    map: "Venue Map",
    faq: "FAQ",
    contact: "Contact",
    explore: "Explore",
    b2b: "B2B Meetings",
    search: "Search",
    featuredNews: "Featured News",
    upcomingActivities: "Upcoming Activities",
    officialSponsors: "Official Sponsors 2026",
    socialNetworks: "Social Media",
    contactUs: "Contact Us",
    seeAll: "See all →",
    fullAgenda: "View full schedule →",
    language: "Select Language",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    connectB2B: "Connect B2B",
    registeredCompany: "Registered Company",
    accreditedExhibitor: "Accredited Exhibitor",
    stands: "Stands & Spaces",
  },
  PT: {
    home: "Início",
    about: "Sobre a ExpoJuy 2026",
    exhibitors: "Expositores",
    agenda: "Agenda",
    news: "Notícias",
    map: "Mapa do Local",
    faq: "Perguntas Frequentes",
    contact: "Contato",
    explore: "Explorar",
    b2b: "Rodada B2B",
    search: "Buscar",
    featuredNews: "Notícias em Destaque",
    upcomingActivities: "Próximas Atividades",
    officialSponsors: "Patrocinadores Oficiais 2026",
    socialNetworks: "Redes Sociais",
    contactUs: "Fale Conosco",
    seeAll: "Ver todas →",
    fullAgenda: "Ver agenda completa →",
    language: "Selecionar Idioma",
    darkMode: "Modo Escuro",
    lightMode: "Modo Claro",
    connectB2B: "Conectar B2B",
    registeredCompany: "Empresa Registrada",
    accreditedExhibitor: "Expositor Acreditado",
    stands: "Stands & Espaços",
  },
  FR: {
    home: "Accueil",
    about: "À propos d'ExpoJuy 2026",
    exhibitors: "Exposants",
    agenda: "Programme",
    news: "Actualités",
    map: "Plan del Site",
    faq: "Questions Fréquentes",
    contact: "Contact",
    explore: "Explorer",
    b2b: "Rencontres B2B",
    search: "Rechercher",
    featuredNews: "Actualités à la Une",
    upcomingActivities: "Activités à Venir",
    officialSponsors: "Sponsors Officiels 2026",
    socialNetworks: "Réseaux Sociaux",
    contactUs: "Nous Contacter",
    seeAll: "Voir toutes →",
    fullAgenda: "Voir le programme complet →",
    language: "Choisir la Langue",
    darkMode: "Mode Sombre",
    lightMode: "Mode Clair",
    connectB2B: "Connecter B2B",
    registeredCompany: "Entreprise Enregistrée",
    accreditedExhibitor: "Exposant Accrédité",
    stands: "Stands & Espaces",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Código del lenguaje para Google Translate (ES -> es, EN -> en, PT -> pt, FR -> fr)
const LANG_MAP: Record<Language, string> = {
  ES: "es",
  EN: "en",
  PT: "pt",
  FR: "fr",
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("expojuy_language") as Language | null;
    return saved && saved in LANGS ? saved : "ES";
  });

  // Inicializar Google Translate script de forma transparente e invisible
  useEffect(() => {
    // 1. Inyectar contenedor oculto para Google Translate
    if (!document.getElementById("google_translate_element")) {
      const googleDiv = document.createElement("div");
      googleDiv.id = "google_translate_element";
      googleDiv.style.display = "none";
      document.body.appendChild(googleDiv);
    }

    // 2. Inyectar estilos para ocultar la barra superior de Google Translate si apareciera
    if (!document.getElementById("google_translate_styles")) {
      const style = document.createElement("style");
      style.id = "google_translate_styles";
      style.innerHTML = `
        .goog-te-banner-frame, .goog-te-balloon-frame { display: none !important; }
        body { top: 0px !important; }
        .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
      `;
      document.head.appendChild(style);
    }

    // 3. Callback global para Google Translate
    (window as any).googleTranslateElementInit = function () {
      if ((window as any).google?.translate?.TranslateElement) {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: "es",
            includedLanguages: "es,en,pt,fr",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    // 4. Cargar el Script oficial de Google Translate si no existe
    if (!document.getElementById("google_translate_script")) {
      const script = document.createElement("script");
      script.id = "google_translate_script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  // Efecto para traducir el DOM de la aplicación al cambiar el idioma
  useEffect(() => {
    localStorage.setItem("expojuy_language", language);
    document.documentElement.lang = LANG_MAP[language];

    const targetLang = LANG_MAP[language];

    // Actualizar cookie de Google Translate (googtrans)
    const domain = window.location.hostname;
    const cookieValue = `/es/${targetLang}`;
    
    document.cookie = `googtrans=${cookieValue}; path=/; domain=${domain}`;
    document.cookie = `googtrans=${cookieValue}; path=/;`;

    // Intentar disparar cambio en el selector desplegable de Google Translate si está montado
    const selectElem = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
    if (selectElem) {
      selectElem.value = targetLang;
      selectElem.dispatchEvent(new Event("change"));
    }
  }, [language]);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
  };

  const t = (key: string) => {
    return translations[language]?.[key] ?? translations.ES[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage debe usarse dentro de un LanguageProvider");
  }
  return context;
}
