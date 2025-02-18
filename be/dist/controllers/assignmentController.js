"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadAssignments = exports.generateAssignments = exports.uploadPreviousAssignments = exports.uploadEmployees = void 0;
const csvParser_1 = require("../utils/csvParser");
const assignmentGenerator_1 = require("../utils/assignmentGenerator");
const errorHandler_1 = require("../middleware/errorHandler");
const fast_csv_1 = require("fast-csv");
// In-memory storage
let employees = [];
let previousAssignments = [];
let currentAssignments = [];
const uploadEmployees = async (req, res, next) => {
    try {
        if (!req.file) {
            throw new errorHandler_1.AppError('No file uploaded', 400);
        }
        employees = await (0, csvParser_1.parseEmployeesCSV)(req.file.buffer);
        if (employees.length === 0) {
            throw new errorHandler_1.AppError('No valid employees found in CSV', 400);
        }
        res.status(200).json({
            status: 'success',
            data: {
                employeeCount: employees.length
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.uploadEmployees = uploadEmployees;
const uploadPreviousAssignments = async (req, res, next) => {
    try {
        if (!req.file) {
            throw new errorHandler_1.AppError('No file uploaded', 400);
        }
        previousAssignments = await (0, csvParser_1.parsePreviousAssignmentsCSV)(req.file.buffer);
        res.status(200).json({
            status: 'success',
            data: {
                assignmentCount: previousAssignments.length
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.uploadPreviousAssignments = uploadPreviousAssignments;
const generateAssignments = async (req, res, next) => {
    try {
        if (employees.length === 0) {
            throw new errorHandler_1.AppError('No employees loaded. Please upload employees first.', 400);
        }
        const generator = new assignmentGenerator_1.AssignmentGenerator();
        currentAssignments = generator.generateAssignments(employees, previousAssignments);
        res.status(200).json({
            status: 'success',
            data: {
                assignmentCount: currentAssignments.length,
                assignments: currentAssignments
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.generateAssignments = generateAssignments;
const downloadAssignments = async (req, res, next) => {
    try {
        if (!currentAssignments || currentAssignments.length === 0) {
            throw new errorHandler_1.AppError('No assignments generated yet', 400);
        }
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=secret-santa-assignments.csv');
        const csvStream = (0, fast_csv_1.format)({ headers: true });
        csvStream.pipe(res);
        currentAssignments.forEach((assignment) => csvStream.write(assignment));
        csvStream.end(); // Ensure the stream is properly closed
    }
    catch (error) {
        next(error);
    }
};
exports.downloadAssignments = downloadAssignments;
