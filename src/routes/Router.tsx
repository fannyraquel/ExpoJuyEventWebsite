import { useNavigation } from "../context/NavigationContext";
import { ROUTES } from "./routes.config";
import InicioPage from "../pages/home/InicioPage";

export default function Router() {
  const { activeSection } = useNavigation();

  const currentRoute = ROUTES.find((r) => r.sectionKey === activeSection);
  const PageComponent = currentRoute ? currentRoute.component : InicioPage;

  return <PageComponent />;
}
