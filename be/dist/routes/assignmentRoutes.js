"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = require("../middleware/upload");
const assignmentController_1 = require("../controllers/assignmentController");
const router = (0, express_1.Router)();
router.post('/upload-employees', upload_1.upload.single('file'), assignmentController_1.uploadEmployees);
router.post('/upload-previous-assignments', upload_1.upload.single('file'), assignmentController_1.uploadPreviousAssignments);
router.post('/generate-assignments', assignmentController_1.generateAssignments);
router.get('/download-assignments', assignmentController_1.downloadAssignments);
exports.default = router;
