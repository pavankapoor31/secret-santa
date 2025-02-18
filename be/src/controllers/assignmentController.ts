import { Request, Response, NextFunction } from 'express';
import { parseEmployeesCSV, parsePreviousAssignmentsCSV } from '../utils/csvParser';
import { AssignmentGenerator } from '../utils/assignmentGenerator';
import { Employee, PreviousAssignment, Assignment } from '../types';
import { AppError } from '../middleware/errorHandler';
import { stringify } from 'fast-csv';

// In-memory storage
let employees: Employee[] = [];
let previousAssignments: PreviousAssignment[] = [];
let currentAssignments: Assignment[] = [];

export const uploadEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      throw new AppError('No file uploaded', 400);
    }

    employees = await parseEmployeesCSV(req.file.buffer);
    
    if (employees.length === 0) {
      throw new AppError('No valid employees found in CSV', 400);
    }

    res.status(200).json({
      status: 'success',
      data: {
        employeeCount: employees.length
      }
    });
  } catch (error) {
    next(error);
  }
};

export const uploadPreviousAssignments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      throw new AppError('No file uploaded', 400);
    }

    previousAssignments = await parsePreviousAssignmentsCSV(req.file.buffer);
    
    res.status(200).json({
      status: 'success',
      data: {
        assignmentCount: previousAssignments.length
      }
    });
  } catch (error) {
    next(error);
  }
};

export const generateAssignments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (employees.length === 0) {
      throw new AppError('No employees loaded. Please upload employees first.', 400);
    }

    const generator = new AssignmentGenerator();
    currentAssignments = generator.generateAssignments(employees, previousAssignments);

    res.status(200).json({
      status: 'success',
      data: {
        assignmentCount: currentAssignments.length
      }
    });
  } catch (error) {
    next(error);
  }
};

export const downloadAssignments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (currentAssignments.length === 0) {
      throw new AppError('No assignments generated yet', 400);
    }

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=secret-santa-assignments.csv');

    stringify(currentAssignments, { headers: true })
      .pipe(res);
  } catch (error) {
    next(error);
  }
};