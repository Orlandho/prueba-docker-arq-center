# Walkthrough: Proyecto de App de Notas Completado

He terminado de construir y configurar tu mini proyecto de aplicación de notas siguiendo estrictamente todas tus especificaciones de arquitectura y patrones de diseño. Aquí te resumo lo que se implementó y cómo probarlo.

## 1. Backend: N-Tier (Node.js + Express)
Se ha estructurado un backend robusto separado en capas funcionales:

- **Capa de Presentación (`src/routes`, `src/controllers`, `src/middlewares`)**: 
  - Manejo de endpoints `/api/auth` y `/api/notes`.
  - Middlewares de seguridad: `authenticateJWT`, `requireRole`, y `upload` para gestionar Multer de manera centralizada.
- **Capa de Negocio (`src/services`)**:
  - `AuthService`: Orquesta el cifrado de Bcrypt y la generación de JWT.
  - `NoteService`: Valida la persistencia física del `.txt` mediante Multer y luego manda el registro a base de datos, separando esta lógica del controlador.
- **Capa de Acceso a Datos (`src/repositories`, `src/config`)**:
  - **Patrón Repositorio**: `UserRepository` y `NoteRepository` manejan todas las consultas SQL (a través de Sequelize).
  - **Patrón Singleton**: Implementado en la conexión de la base de datos (`database.ts`) y en el `AuditLoggerService`.

## 2. Base de Datos: 3NF y SQL Express (Docker)
El esquema se genera automáticamente mediante Sequelize Sync (`src/models/index.ts`) y cumple con las reglas OLTP 3NF:

- **Tablas Maestras/Catálogos**: `Roles` y `PermissionLevels`.
- **Tabla de Intersección**: `NoteShares` que conecta a un `Usuario` con una `Nota` de otro usuario, permitiendo el atributo `permission_level_id`.
- **Bitácora de Auditoría**: La tabla `AuditLogs` que registra `INSERT` usando el `AuditLoggerService` (Insert-only).
- **Borrado Lógico**: Aplicado como `is_active = false` en lugar de `DELETE` físico dentro de `NoteRepository`.

Todo esto corre orquestado dentro de un `docker-compose.yml` que empaqueta tanto SQL Server Express como la propia API del backend.

## 3. Frontend: MVVM (React + Electron)
Se inicializó con Vite, React y TypeScript (empaquetado listo para Electron).

- **Model**: `models/api.ts` utilizando Axios con un interceptor que inyecta automáticamente el JWT desde el LocalStorage.
- **ViewModel**: Los Custom Hooks `useAuth.ts` y `useNotes.ts` exponen el estado (`loading`, `error`, `myNotes`) y los métodos (`login`, `uploadNote`) aislados de la UI.
- **View**: Los componentes React puramente visuales `LoginView.tsx` y `NotesView.tsx`.

> [!WARNING]
> **Docker no está corriendo**
> Intenté ejecutar `docker-compose up -d` pero tu motor de Docker Desktop está apagado.

## ¿Cómo ejecutar el proyecto?

1. **Abre Docker Desktop** en tu computadora.
2. Abre la terminal en la raíz del proyecto (`C:\Users\Orlando\Desktop\prueba-docker-arq-center`) y corre:
   ```bash
   docker-compose up -d --build
   ```
3. Esto levantará SQL Express y el servidor Backend Node.js en el puerto `3000`.
4. Abre otra terminal, ve a la carpeta del frontend y ejecuta en desarrollo:
   ```bash
   cd frontend
   npm run dev
   ```
   *Esto iniciará la aplicación React empaquetada como ventana de escritorio con Electron.*
5. Cuando estés listo para compilar el `.exe` final de Electron:
   ```bash
   npm run electron:build
   ```
