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

// Helper para detectar y preservar la subruta base del sitio (ej: "/ExpoJuyEventWebsite" en GitHub Pages)
function getBasePrefix(): string {
  const pathname = window.location.pathname;

  for (const route of ROUTES) {
    if (route.path !== "/" && pathname.endsWith(route.path)) {
      return pathname.slice(0, pathname.length - route.path.length);
    }
  }

  if (pathname !== "/" && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  if (pathname !== "/" && !ROUTES.some((r) => r.path === pathname)) {
    return pathname;
  }

  return "";
}

function getPathBySection(section: Section): string {
  const basePrefix = getBasePrefix();
  const route = ROUTES.find((r) => r.sectionKey === section);
  const routePath = route ? route.path : "/";

  if (routePath === "/") {
    return basePrefix ? `${basePrefix}/` : "/";
  }
  return `${basePrefix}${routePath}`;
}

function getSectionByPath(pathname: string): Section {
  const basePrefix = getBasePrefix();
  let cleanPath = pathname;

  if (basePrefix && cleanPath.startsWith(basePrefix)) {
    cleanPath = cleanPath.slice(basePrefix.length);
  }

  cleanPath =
    cleanPath === "" || cleanPath === "/"
      ? "/"
      : cleanPath.endsWith("/")
      ? cleanPath.slice(0, -1)
      : cleanPath;

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

