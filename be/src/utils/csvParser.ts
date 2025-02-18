import { parse } from 'fast-csv';
import { Employee, PreviousAssignment } from '../types';

export const parseEmployeesCSV = (buffer: Buffer): Promise<Employee[]> => {
  return new Promise((resolve, reject) => {
    const employees: Employee[] = [];
    
    parse(buffer.toString(), { headers: true })
      .on('error', error => reject(error))
      .on('data', (row: Employee) => {
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
    
    parse(buffer.toString(), { headers: true })
      .on('error', error => reject(error))
      .on('data', (row: PreviousAssignment) => {
        if (row.santa && row.recipient) {
          assignments.push(row);
        }
      })
      .on('end', () => resolve(assignments));
  });
};