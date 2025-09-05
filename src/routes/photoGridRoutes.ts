import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { upload } from '../middleware/upload';
import { DEFAULT_COLUMNS, DEFAULT_ROWS } from '../config/constants';
import { generatePhotoGridPDF } from '../services/pdfGridService';

const router = Router();

function parseIntSafe(val: any): number | undefined {
  const n = parseInt(val, 10);
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

router.post('/generate', upload.single('photo'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Falta el archivo "photo"' });
    }

    const columns = parseIntSafe((req.body as any)?.columns) ?? DEFAULT_COLUMNS;
    const rows = parseIntSafe((req.body as any)?.rows) ?? DEFAULT_ROWS;

    const doc = await generatePhotoGridPDF({ buffer: req.file.buffer, columns, rows });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="grid.pdf"');

    doc.pipe(res);
    doc.end();
  } catch (e) {
    next(e);
  }
});

export { router as photoGridRoutes };
