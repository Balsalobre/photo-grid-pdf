# 📸 photo-grid-pdf

<div align="center">

![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white)
![sharp](https://img.shields.io/badge/sharp-99CC00?style=for-the-badge&logo=sharp&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-3DA639?style=for-the-badge&logo=creativecommons&logoColor=white)

**A lightweight Bun + Express service that generates an A4 landscape PDF with a repeated grid of the same photo (default 11 columns × 6 rows) and 1 cm margins.**

[Features](#-features) •
[Endpoints](#-endpoints) •
[Quick start](#-quick-start)

</div>

---

## ✨ Features

- 🧩 Configurable grid (`columns`, `rows`)
- 🖼️ Preserves aspect ratio, image centered in each cell
- 📄 A4 landscape output (297 × 210 mm) with a uniform 10 mm margin
- 🚀 Fast — `sharp` + `pdfkit` fully in memory
- 🛡️ Size limit: 15 MB
- 🎯 Internal conversion to JPEG (92% quality, 4:4:4) for standardization

---

## 🛠️ Requirements

- [Bun](https://bun.sh) installed
- (Optional) `PORT` environment variable (default `3000`)

## 📦 Quick Start

```bash
bun install
bun run dev        # development
bun start          # production / direct run
```

Server listens by default at `http://localhost:3000`.

---

## 🌐 Endpoints

### ✅ Healthcheck

`GET /health`

```json
{ "status": "ok" }
```

### 🧾 Generate PDF

`POST /generate` (`multipart/form-data`)

Form fields:
- `photo` (required): image file (JPG, PNG, WEBP, etc.)
- `columns` (optional, int > 0) — default `11`
- `rows` (optional, int > 0) — default `6`

Generated PDF properties:
- Size: A4 landscape (297 mm × 210 mm)
- Margins: 10 mm on all four sides
- Layout: `columns × rows` grid
- Scaling: aspect ratio preserved, centered in each cell (letterboxed within the available space when ratios differ)

#### 📌 curl example

```bash
curl -X POST http://localhost:3000/generate \
	-F "photo=@/path/to/photo.jpg" \
	-F "columns=11" \
	-F "rows=6" \
	--output grid.pdf
```

#### Common error responses

```jsonc
// Missing file
{ "error": "Falta el archivo \"photo\"" }

// Generic internal error
{ "error": "Error interno", "details": "<message>" }
```

---

## 🧾 Parameters & Limits

| Parameter | Type | Default | Description |
|----------|------|---------|-------------|
| `photo`  | file | (required) | Source image |
| `columns`| int  | 11 | Number of columns (>0) |
| `rows`   | int  | 6  | Number of rows (>0) |
| Max file size | — | 15 MB | Rejected if exceeded |

---

## 🧠 Technical Notes

- Pre-conversion to JPEG standardizes compression and avoids color inconsistencies
- Everything is processed in memory (nothing written to disk)
- The PDF is sent with `Content-Disposition: inline` (force download with external tooling if needed)

## 🧭 Project Structure

```
src/
	main.ts           # Bootstrap (reads PORT)
	server.ts         # Express config + health + routes + error handler
	routes/photoGridRoutes.ts
	services/pdfGridService.ts
	middleware/{upload,errorHandler}.ts
	config/constants.ts
	utils/units.ts
```

## 🧪 Useful Commands

```bash
bun run type-check   # Type checking
bun run build        # (Optional) build to dist
```

---

## 🚧 Suggested Future Improvements

- Validate / force cell proportions (e.g. 35×45 mm passport size) with optional cropping
- Support multiple distinct images per cell
- Automatic pagination when cells exceed one page
- Metadata endpoint (cell dimensions in mm / pt)

---

## 📄 License

MIT — see [`LICENSE`](LICENSE).

---

<div align="center">

Made with ❤️ using Bun, Express, sharp and pdfkit.

</div>
