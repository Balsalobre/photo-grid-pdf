import type { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  console.error('Error:', err);
  if (res.headersSent) return;
  res.status(500).json({ error: 'Error interno', details: err?.message });
}
