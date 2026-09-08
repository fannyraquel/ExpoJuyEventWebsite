import { ReactNode } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useTheme } from "../../context/ThemeContext";
import GlobalVisualBackground from "./GlobalVisualBackground";

export default function MainLayout({ children }: { children: ReactNode }) {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-full ${darkMode ? "dark" : ""}`} style={{ background: "transparent" }}>
      <GlobalVisualBackground />
      <NavBar />
      <main className="relative z-10 min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
