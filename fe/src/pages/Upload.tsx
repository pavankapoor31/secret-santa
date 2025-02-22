import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload as UploadIcon, FileSpreadsheet } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import Papa from 'papaparse';
import { useStore } from '../store/useStore';
import { uploadEmployees, uploadPreviousAssignments } from '../api';
import type { Employee, Assignment } from '../types';

export function Upload() {
  const navigate = useNavigate();
  const { setEmployees, setPreviousAssignments } = useStore();

  const onEmployeesDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    Papa.parse(file, {
      complete: async (results) => {
        try {
          const response = await uploadEmployees(file);
          if (response.error) {
            toast.error(response.error);
            return;
          }
          if (response.data) {
            setEmployees(response.data);
            toast.success('Employee list uploaded successfully!');
          }
        } catch (error) {
          toast.error('Failed to upload employee list');
        }
      },
      header: true,
      skipEmptyLines: true,
    });
  }, [setEmployees]);

  const onPreviousAssignmentsDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    Papa.parse(file, {
      complete: async (results) => {
        try {
          const response = await uploadPreviousAssignments(file);
          if (response.error) {
            toast.error(response.error);
            return;
          }
          if (response.data) {
            setPreviousAssignments(response.data);
            toast.success('Previous assignments uploaded successfully!');
          }
        } catch (error) {
          toast.error('Failed to upload previous assignments');
        }
      },
      header: true,
      skipEmptyLines: true,
    });
  }, [setPreviousAssignments]);

  const employeesDropzone = useDropzone({
    onDrop: onEmployeesDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    maxFiles: 1,
  });

  const previousAssignmentsDropzone = useDropzone({
    onDrop: onPreviousAssignmentsDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    maxFiles: 1,
  });

  const downloadDummyCSVFile = () => {
    const csvContent = `Employee_Name,Employee_EmailID,Employee_Team
    Hamish Murray,hamish.murray@acme.com,A
    Layla Graham,layla.graham@acme.com,B
    Matthew King,matthew.king@acme.com,C
    Benjamin Collins,benjamin.collins@acme.com,A
    Isabella Scott,isabella.scott@acme.com,B
    Charlie Ross,charlie.ross@acme.com,C
    Riley Lee,riley.lee@acme.com,A
    Piper Stewart,piper.stewart@acme.com,B
    Spencer Allen,spencer.allen@acme.com,C
    Charlie Wright,charlie.wright@acme.com,A
    Ethan Murray,ethan.murray@acme.com,B
    Julian Ross,julian.ross@acme.com,C
    Evelyn Lawrence,evelyn.lawrence@acme.com,A
    Matthew King,matthew.king.jr@acme.com,B
    Mark Lawrence,mark.lawrence@acme.com,C`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'dummy-employees.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">Upload Files</h1>
        <p className="mt-2 text-gray-600">
          Upload your employee list and optionally include last year's assignments
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Employee List Upload */}
        <div>
        <div
          {...employeesDropzone.getRootProps()}
          className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
            ${employeesDropzone.isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}`}
        >
          <input {...employeesDropzone.getInputProps()} />
          <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-lg font-medium text-gray-900">Employee List (Required)</p>
          <p className="mt-2 text-sm text-gray-500">
            Drag and drop your employee CSV file here, or click to select
          </p>
          <p className="mt-1 text-xs text-gray-400">
            CSV format: Employee_Name,Employee_EmailID,Employee_Team
          </p>
        </div>
        </div>

        {/* Previous Assignments Upload */}
        <div
          {...previousAssignmentsDropzone.getRootProps()}
          className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
            ${previousAssignmentsDropzone.isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-400'}`}
        >
          <input {...previousAssignmentsDropzone.getInputProps()} />
          <FileSpreadsheet className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-lg font-medium text-gray-900">Previous Assignments (Optional)</p>
          <p className="mt-2 text-sm text-gray-500">
            Drag and drop last year's assignments CSV here
          </p>
          <p className="mt-1 text-xs text-gray-400">
            CSV format: giver_email, receiver_email
          </p>
        </div>
      </div>
      <button
            onClick={downloadDummyCSVFile}
            className="button-sm font-xs inline-flex items-center mt-1 px-2 py-1 border border-transparent rounded-md shadow-sm text-white bg-gray-600 hover:bg-indigo-700"
            >
            Download Dummy CSV File
          </button>
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => navigate('/results')}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Continue to Results
        </button>
      </div>
    </div>
  );
}