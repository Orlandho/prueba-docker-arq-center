# Proyecto: App de Notas (React + Electron + Node.js + SQL Express)

Este proyecto está dividido en dos partes principales: el backend y el frontend. Para ejecutarlo, necesitas tener Docker instalado y ejecutándose (Docker Desktop).

## 1. Levantar el Backend y la Base de Datos (con Docker)

Asegúrate de que Docker Desktop esté encendido. Abre una terminal en esta misma carpeta (donde está este archivo) y ejecuta:

```bash
docker-compose up -d --build
```

Esto descargará las imágenes necesarias y levantará:
- Un contenedor con **SQL Server Express** (puerto 1433).
- Un contenedor con el **Backend Node.js** (puerto 3000).

*(La primera vez puede tardar un poco mientras descarga la imagen de SQL Server).*

## 2. Ejecutar el Frontend de Escritorio (Electron + React)

Abre **otra** ventana de terminal, entra a la carpeta `frontend` y ejecuta la aplicación en modo desarrollo:

```bash
cd frontend
npm run dev
```

Esto abrirá la ventana de la aplicación de escritorio de tu sistema de notas, que automáticamente se conectará al backend que está corriendo en Docker en el puerto 3000.

## 3. Comandos Útiles

- **Para apagar el backend y la base de datos:**
  ```bash
  docker-compose down
  ```
- **Para generar el instalador (.exe) del frontend:**
  ```bash
  cd frontend
  npm run electron:build
  ```
