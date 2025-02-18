"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePreviousAssignmentsCSV = exports.parseEmployeesCSV = void 0;
const fast_csv_1 = require("fast-csv");
const parseEmployeesCSV = (buffer) => {
    return new Promise((resolve, reject) => {
        const employees = [];
        (0, fast_csv_1.parseString)(buffer.toString(), { headers: true })
            .on('error', (error) => reject(error))
            .on('data', (row) => {
            if (row.Employee_Name && row.Employee_EmailID) {
                employees.push(row);
            }
        })
            .on('end', () => resolve(employees));
    });
};
exports.parseEmployeesCSV = parseEmployeesCSV;
const parsePreviousAssignmentsCSV = (buffer) => {
    return new Promise((resolve, reject) => {
        const assignments = [];
        (0, fast_csv_1.parseString)(buffer.toString(), { headers: true })
            .on('error', (error) => reject(error))
            .on('data', (row) => {
            if (row.santa && row.recipient) {
                assignments.push(row);
            }
        })
            .on('end', () => resolve(assignments));
    });
};
exports.parsePreviousAssignmentsCSV = parsePreviousAssignmentsCSV;
