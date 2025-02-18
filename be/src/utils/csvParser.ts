import { parse } from 'fast-csv';
import { Readable } from 'stream';

interface EmployeeRow {
  Employee_Name: string;
  Employee_EmailID: string;
}

export const parseEmployeeCsv = (buffer: Buffer): Promise<EmployeeRow[]> => {
  return new Promise((resolve, reject) => {
    const employees: EmployeeRow[] = [];
    const stream = Readable.from(buffer.toString());

    stream
      .pipe(parse({ headers: true, skipRows: 0 }))
      .on('data', (row: EmployeeRow) => {
        if (row.Employee_Name && row.Employee_EmailID) {
          employees.push(row);
        }
      })
      .on('error', reject)
      .on('end', () => resolve(employees));
  });
};