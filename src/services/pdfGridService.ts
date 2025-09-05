import PDFDocument from 'pdfkit';
import sharp from 'sharp';
import { A4_WIDTH_MM, A4_HEIGHT_MM, MARGIN_MM } from '../config/constants';
import { mmToPt } from '../utils/units';

export interface GridOptions {
  columns: number;
  rows: number;
}

export interface GenerateParams extends GridOptions {
  buffer: Buffer;
}

export async function generatePhotoGridPDF({ buffer, columns, rows }: GenerateParams) {
  // Pre-process image (convert to high-quality JPEG to standardize)
  const image = sharp(buffer);
  const meta = await image.metadata();
  if (!meta.width || !meta.height) {
    throw new Error('No se pudo obtener dimensiones de la imagen');
  }
  const processed = await image.jpeg({ quality: 92, chromaSubsampling: '4:4:4' }).toBuffer();

  const imgRatio = meta.width / meta.height;

  const pageW = mmToPt(A4_WIDTH_MM);
  const pageH = mmToPt(A4_HEIGHT_MM);
  const margin = mmToPt(MARGIN_MM);

  const drawableW = pageW - 2 * margin;
  const drawableH = pageH - 2 * margin;

  const cellW = drawableW / columns;
  const cellH = drawableH / rows;

  const doc = new PDFDocument({ size: [pageW, pageH], margins: { top: margin, bottom: margin, left: margin, right: margin } });

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      const cellRatio = cellW / cellH;
      let drawW = cellW;
      let drawH = cellH;
      if (imgRatio > cellRatio) {
        drawW = cellW;
        drawH = drawW / imgRatio;
      } else {
        drawH = cellH;
        drawW = drawH * imgRatio;
      }
      const x = margin + c * cellW + (cellW - drawW) / 2;
      const y = margin + r * cellH + (cellH - drawH) / 2;
      doc.image(processed, x, y, { width: drawW, height: drawH });
    }
  }

  return doc;
}
