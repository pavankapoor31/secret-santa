import { Request, Response, NextFunction } from 'express';
import Employee from '../models/Employee';
import Assignment from '../models/Assignment';
import { AssignmentGenerator } from '../utils/assignmentGenerator';
import { AppError } from '../middleware/errorHandler';
import { parse } from 'fast-csv';

export const generateAssignments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentYear = new Date().getFullYear();
    const employees = await Employee.find();
    
    if (employees.length < 2) {
      throw new AppError('Not enough employees to generate assignments', 400);
    }

    const previousAssignments = await Assignment.find({ 
      year: currentYear - 1 
    });

    const generator = new AssignmentGenerator();
    const newAssignments = generator.generateAssignments(employees, previousAssignments);

    // Save new assignments
    await Assignment.deleteMany({ year: currentYear });
    const savedAssignments = await Assignment.create(
      newAssignments.map(assignment => ({
        ...assignment,
        year: currentYear
      }))
    );

    res.status(200).json({
      status: 'success',
      data: {
        assignments: savedAssignments
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
    const currentYear = new Date().getFullYear();
    const assignments = await Assignment.find({ year: currentYear })
      .populate('giver')
      .populate('receiver');

    if (!assignments.length) {
      throw new AppError('No assignments found for the current year', 404);
    }

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=secret-santa-${currentYear}.csv`);

    const csvStream = parse({ headers: true });
    csvStream.pipe(res);

    assignments.forEach(assignment => {
      csvStream.write({
        Giver_Name: assignment.giver,
        Giver_Email: assignment.giver,
        Receiver_Name: assignment.receiver,
        Receiver_Email: assignment.receiver
      });
    });

    csvStream.end();
  } catch (error) {
    next(error);
  }
};