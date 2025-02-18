import { Router } from 'express';
import { upload } from '../middleware/upload';
import * as employeeController from '../controllers/employeeController';
import * as assignmentController from '../controllers/assignmentController';

const router = Router();

router.post(
  '/upload-employees',
  upload.single('file'),
  employeeController.uploadEmployees
);

router.post(
  '/generate-assignments',
  assignmentController.generateAssignments
);

router.get(
  '/download-assignments',
  assignmentController.downloadAssignments
);

export default router;