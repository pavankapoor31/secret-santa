"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const errorHandler_1 = require("./errorHandler");
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'text/csv') {
            cb(new errorHandler_1.AppError('Only CSV files are allowed', 400));
            return;
        }
        cb(null, true);
    },
    limits: {
        fileSize: 1024 * 1024 // 1MB limit
    }
});
