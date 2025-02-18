import { parseString } from 'fast-csv';
import { Employee, PreviousAssignment } from '../types';

export const parseEmployeesCSV = (buffer: Buffer): Promise<Employee[]> => {
  return new Promise((resolve, reject) => {
    const employees: Employee[] = [];

    parseString(buffer.toString(), { headers: true })
      .on('error', (error) => reject(error))
      .on('data', (row: any) => {
        if (row.Employee_Name && row.Employee_EmailID) {
          employees.push(row);
        }
      })
      .on('end', () => resolve(employees));
  });
};

export const parsePreviousAssignmentsCSV = (buffer: Buffer): Promise<PreviousAssignment[]> => {
  return new Promise((resolve, reject) => {
    const assignments: PreviousAssignment[] = [];

    parseString(buffer.toString(), { headers: true })
      .on('error', (error) => reject(error))
      .on('data', (row: Record<string, string>) => {
        if (row.santa && row.recipient) {
          assignments.push(row as any);
        }
      })
      .on('end', () => resolve(assignments));
  });
};
