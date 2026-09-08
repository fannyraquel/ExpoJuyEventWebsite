# Estructura de Carpetas del Proyecto — ExpoJuy Event Website

A continuación se detalla la estructura física del proyecto y las responsabilidades de cada módulo:

```text
ExpoJuyEventWebsite/
├── documentation/               # Documentación del sistema
│   ├── ARCHITECTURE.md          # Arquitectura general y diagramas
│   ├── FOLDER_STRUCTURE.md      # Guía de estructura de archivos (este archivo)
│   ├── RBAC_AND_ROLES.md        # Roles, permisos y seguridad
│   ├── API_CLIENT_GUIDE.md      # Capa de red y conexión a backend
│   └── FORMS_GUIDE.md           # Guía de formularios y validaciones
├── src/
│   ├── api/                     # Cliente HTTP y Servicios de Backend
│   │   ├── client.ts            # Wrapper Fetch centralizado con Bearer Tokens
│   │   ├── endpoints.ts         # Mapa de rutas de la API (/api/v1/...)
│   │   └── services/            # Servicios de datos por entidad
│   │       ├── agendaService.ts
│   │       ├── authService.ts
│   │       ├── empresasService.ts
│   │       ├── noticiasService.ts
│   │       └── standsService.ts
│   ├── config/                  # Configuraciones Globales de la App
│   │   ├── api.config.ts        # BaseURL, timeouts y storage keys
│   │   ├── roles.config.ts      # Roles RBAC y matriz de permisos
│   │   ├── site.config.ts       # Metadatos del evento ExpoJuy
│   │   └── theme.config.ts      # STATUS_CONFIG, CAT_COLORS, LANGS
│   ├── context/                 # Estado Global (React Context)
│   │   ├── AuthContext.tsx      # Gestión de usuario y rol activo
│   │   ├── NavigationContext.tsx# Navegación y URL history
│   │   └── ThemeContext.tsx     # Estado claro/oscuro (Dark Mode)
│   ├── data/                    # Datos estáticos / Fallbacks offline
│   │   ├── agenda.data.ts
│   │   ├── bioceanico.data.ts
│   │   ├── empresas.data.ts
│   │   ├── indicadores.data.ts
│   │   ├── noticias.data.ts
│   │   ├── regiones.data.ts
│   │   └── stands.data.ts
│   ├── forms/                   # Módulo de Formularios Extensible
│   │   ├── b2b/
│   │   │   └── SolicitudB2BForm.tsx
│   │   ├── common/              # Inputs reutilizables con validación
│   │   │   ├── FormField.tsx
│   │   │   ├── FormInput.tsx
│   │   │   ├── FormSelect.tsx
│   │   │   └── FormTextArea.tsx
│   │   ├── contacto/
│   │   │   └── ContactoForm.tsx
│   │   └── expositores/
│   │       └── RegistroExpositorForm.tsx
│   ├── components/              # Componentes de Interfaz UI
│   │   ├── common/              # Componentes visuales atómicos
│   │   │   ├── AguayoDivider.tsx
│   │   │   ├── FlagIcon.tsx
│   │   │   ├── LangSelector.tsx
│   │   │   ├── RoleGuard.tsx
│   │   │   └── StatusBadge.tsx
│   │   ├── features/            # Visualizaciones complejas (SVG)
│   │   │   ├── BioceanicoMap.tsx
│   │   │   └── InteractiveMap.tsx
│   │   └── layout/              # Estructura envolvente
│   │       ├── Footer.tsx
│   │       ├── MainLayout.tsx
│   │       └── NavBar.tsx
│   ├── pages/                   # Páginas Agrupadas por Dominio
│   │   ├── about/               # Páginas institucionales
│   │   │   └── SobrePage.tsx
│   │   ├── admin/               # Panel de administración
│   │   │   └── AdminDashboardPage.tsx
│   │   ├── agenda/              # Agenda de conferencias
│   │   │   └── AgendaPage.tsx
│   │   ├── auth/                # Selección de sesión y roles
│   │   │   └── LoginPage.tsx
│   │   ├── data/                # Indicadores oficiales
│   │   │   └── ExpoJuyDataPage.tsx
│   │   ├── explorar/            # Directorio de empresas
│   │   │   ├── EmpresaDetailSubPage.tsx
│   │   │   └── ExplorarPage.tsx
│   │   ├── home/                # Landing principal
│   │   │   └── InicioPage.tsx
│   │   ├── negocios/            # Ronda B2B
│   │   │   └── RondaNegociosPage.tsx
│   │   ├── noticias/            # Prensa y novedades
│   │   │   └── NoticiasPage.tsx
│   │   ├── plano/               # Mapa interactivo de stands
│   │   │   └── PlanoPage.tsx
│   │   └── territorio/          # Información regional y geopolítica
│   │       ├── BioceanicoPage.tsx
│   │       └── DescubriJujuyPage.tsx
│   ├── routes/                  # Sistema de Enrutamiento Dinámico
│   │   ├── Router.tsx
│   │   └── routes.config.ts
│   ├── types/                   # Definiciones de Tipos TypeScript
│   │   ├── api.types.ts
│   │   ├── auth.types.ts
│   │   ├── domain.types.ts
│   │   └── navigation.types.ts
│   ├── App.tsx                  # Root Component con Context Providers
│   └── index.css                # Tokens CSS globales y Tailwind v4
```
