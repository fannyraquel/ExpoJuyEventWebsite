# Control de Acceso Basado en Roles (RBAC)

## 🔐 Matriz de Roles y Permisos

ExpoJuy Event Website soporta los siguientes roles de usuario:

| Rol | Identificador | Badge / Color | Permisos Asignados |
| :--- | :--- | :--- | :--- |
| **Visitante** | `visitor` | `#0891B2` (Turquesa) | `view_public`, `view_data_indicators` |
| **Expositor** | `exhibitor` | `#7209B7` (Púrpura) | `view_public`, `view_data_indicators`, `connect_b2b`, `manage_stands` |
| **Prensa** | `press` | `#D97706` (Naranja) | `view_public`, `view_data_indicators` |
| **Administrador** | `admin` | `#DC2626` (Rojo) | `view_public`, `view_data_indicators`, `connect_b2b`, `manage_agenda`, `manage_stands`, `admin_access` |

---

## 🛡️ Uso de `RoleGuard` en Componentes

Para proteger un botón, formulario o una vista completa, utiliza el componente `RoleGuard.tsx`:

```tsx
import RoleGuard from "@/components/common/RoleGuard";

// Proteger por permiso específico
<RoleGuard requiredPermission="connect_b2b" fallback={<p>Acceso denegado</p>}>
  <SolicitudB2BForm empresaNombre="Litio Puna S.A." />
</RoleGuard>

// Proteger vista completa por rol
<RoleGuard requiredRole="admin">
  <AdminDashboardPage />
</RoleGuard>
```
