import multer from 'multer';
import { AppError } from './errorHandler';

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'text/csv') {
      cb(new AppError('Only CSV files are allowed', 400));
      return;
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});