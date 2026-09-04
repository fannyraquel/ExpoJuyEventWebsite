import { ReactNode } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useTheme } from "../../context/ThemeContext";

export default function MainLayout({ children }: { children: ReactNode }) {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-full ${darkMode ? "dark" : ""}`} style={{ background: "var(--t-bg)" }}>
      <NavBar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
