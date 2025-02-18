import { Router } from 'express';
import { upload } from '../middleware/upload';
import {
  uploadEmployees,
  uploadPreviousAssignments,
  generateAssignments,
  downloadAssignments
} from '../controllers/assignmentController';

const router = Router();

router.post('/upload-employees', upload.single('file'), uploadEmployees);
router.post('/upload-previous-assignments', upload.single('file'), uploadPreviousAssignments);
router.post('/generate-assignments', generateAssignments);
router.get('/download-assignments', downloadAssignments);

export default router;