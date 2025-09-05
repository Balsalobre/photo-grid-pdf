declare module 'pdfkit' {
  import { Readable } from 'stream';
  interface PDFDocumentOptions {
    size?: string | [number, number];
    margins?: { top?: number; left?: number; bottom?: number; right?: number };
  }
  class PDFDocument extends Readable {
    constructor(options?: PDFDocumentOptions);
    image(buffer: Buffer | string, x: number, y: number, options?: { width?: number; height?: number }): this;
    pipe(dest: any): any;
    end(): void;
  }
  export default PDFDocument;
}
