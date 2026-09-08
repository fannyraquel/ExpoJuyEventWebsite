import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import { NavigationProvider } from "./context/NavigationContext";
import MainLayout from "./components/layout/MainLayout";
import Router from "./routes/Router";

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <NavigationProvider>
            <MainLayout>
              <Router />
            </MainLayout>
          </NavigationProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
