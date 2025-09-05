# 📸 photo-grid-pdf

Servicio ligero en Bun + Express para generar un PDF A4 apaisado con una cuadrícula repetida de la misma foto (por defecto 11 columnas × 6 filas) y márgenes de 1 cm.

## ✨ Características
- 🧩 Cuadrícula configurable (`columns`, `rows`)
- 🖼️ Mantiene proporción de la imagen centrada en cada celda
- 📄 Salida en A4 horizontal (297 × 210 mm) con margen uniforme de 10 mm
- 🚀 Rápido (usa `sharp` + `pdfkit` en memoria)
- 🛡️ Límite de tamaño: 15 MB
- 🎯 Conversión interna a JPEG (92% calidad, 4:4:4) para estandarizar

## 🛠️ Requisitos
- [Bun](https://bun.sh) instalado
- (Opcional) `PORT` para cambiar el puerto (por defecto `3000`)

## 📦 Instalación

```bash
bun install
```

## 🧪 Desarrollo

```bash
bun run dev
```

## ▶️ Producción / ejecución directa

```bash
bun start
```

Servidor escuchando por defecto en: `http://localhost:3000`.

## 🌐 Endpoints

### ✅ Healthcheck
GET `/health`

Respuesta:
```json
{ "status": "ok" }
```

### 🧾 Generar PDF
POST `/generate` (`multipart/form-data`)

Campos del formulario:
- `photo` (requerido): archivo de imagen (JPG, PNG, WEBP, etc.)
- `columns` (opcional, entero > 0) – por defecto `11`
- `rows` (opcional, entero > 0) – por defecto `6`

Características del PDF generado:
- Tamaño: A4 horizontal (297 mm × 210 mm)
- Márgenes: 10 mm en los cuatro lados
- Disposición: cuadrícula `columns × rows`
- Escalado: mantiene proporción de la imagen, centrada en cada celda (letterboxing dentro del espacio disponible si la proporción no coincide)

#### 📌 Ejemplo con curl
```bash
curl -X POST http://localhost:3000/generate \
	-F "photo=@/ruta/a/foto.jpg" \
	-F "columns=11" \
	-F "rows=6" \
	--output grid.pdf
```

#### Respuestas de error habituales
```jsonc
// Falta archivo
{ "error": "Falta el archivo \"photo\"" }

// Error interno genérico
{ "error": "Error interno", "details": "<mensaje>" }
```

## 🧾 Parámetros y límites
| Parámetro | Tipo | Default | Descripción |
|----------|------|---------|-------------|
| `photo`  | file | (requerido) | Imagen fuente |
| `columns`| int  | 11 | Número de columnas (>0) |
| `rows`   | int  | 6  | Número de filas (>0) |
| Tamaño máx. archivo | — | 15 MB | Rechazado si excede |

## 🧠 Notas técnicas
- Conversión previa a JPEG estandariza compresión y evita inconsistencias de color.
- Todo se procesa en memoria (no se escribe a disco).
- El PDF se envía con `Content-Disposition: inline` (puedes forzar descarga con herramientas externas).

## 🧭 Estructura del proyecto (resumen)
```
src/
	main.ts           # Arranque (lee PORT)
	server.ts         # Config Express + health + rutas + error handler
	routes/photoGridRoutes.ts
	services/pdfGridService.ts
	middleware/{upload,errorHandler}.ts
	config/constants.ts
	utils/units.ts
```

## 🧪 Comandos útiles
```bash
bun run type-check   # Verificar tipos
bun run build        # (Opcional) construir a dist
```

## 🚧 Futuras mejoras sugeridas
- Validar / forzar proporciones (ej. 35×45 mm) y recorte opcional
- Soporte para múltiples imágenes distintas por celda
- Paginación automática si las celdas exceden una página
- Endpoint para devolver metadata (dimensiones de celdas en mm / pt)

## 📄 Licencia
MIT

---
Hecho con ❤️ usando Bun, Express, sharp y pdfkit.
