import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Section } from "../types/domain.types";
import { ROUTES } from "../routes/routes.config";

interface NavigationContextType {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  queryParams: Record<string, string>;
  setQueryParam: (key: string, value: string) => void;
  navigate: (section: Section, params?: Record<string, string>) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

function getPathBySection(section: Section): string {
  const route = ROUTES.find((r) => r.sectionKey === section);
  return route ? route.path : "/";
}

function getSectionByPath(pathname: string): Section {
  const cleanPath = pathname === "" || pathname === "/" ? "/" : pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const route = ROUTES.find((r) => r.path === cleanPath);
  return route ? route.sectionKey : "inicio";
}

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSectionState] = useState<Section>(() => {
    return getSectionByPath(window.location.pathname);
  });
  const [queryParams, setQueryParams] = useState<Record<string, string>>(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  });

  useEffect(() => {
    const handlePopState = () => {
      const currentSection = getSectionByPath(window.location.pathname);
      setActiveSectionState(currentSection);

      const searchParams = new URLSearchParams(window.location.search);
      const params: Record<string, string> = {};
      searchParams.forEach((value, key) => {
        params[key] = value;
      });
      setQueryParams(params);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (section: Section, params?: Record<string, string>) => {
    setActiveSectionState(section);
    const targetPath = getPathBySection(section);
    
    let url = targetPath;
    const mergedParams = params || queryParams;

    if (params) {
      setQueryParams(params);
    }

    if (mergedParams && Object.keys(mergedParams).length > 0) {
      const searchParams = new URLSearchParams();
      Object.entries(mergedParams).forEach(([k, v]) => searchParams.set(k, v));
      url += `?${searchParams.toString()}`;
    }

    if (window.location.pathname + window.location.search !== url) {
      window.history.pushState({}, "", url);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setActiveSection = (section: Section) => {
    navigate(section);
  };

  const setQueryParam = (key: string, value: string) => {
    const newParams = { ...queryParams, [key]: value };
    setQueryParams(newParams);
    navigate(activeSection, newParams);
  };

  return (
    <NavigationContext.Provider
      value={{
        activeSection,
        setActiveSection,
        queryParams,
        setQueryParam,
        navigate,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation debe usarse dentro de un NavigationProvider");
  }
  return context;
}

