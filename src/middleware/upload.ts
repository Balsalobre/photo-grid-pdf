import multer from 'multer';
import { MAX_FILE_SIZE_BYTES } from '../config/constants';

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
});
