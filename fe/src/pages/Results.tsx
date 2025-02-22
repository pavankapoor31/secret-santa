import React from 'react';
import { Gift, Download } from 'lucide-react';
import { toast } from 'react-toastify';
import { useStore } from '../store/useStore';
import { generateAssignments, downloadAssignments } from '../api';

export function Results() {
  const { employees, currentAssignments, setCurrentAssignments } = useStore();

  const handleGenerateAssignments = async () => {
    try {
      const response:any = await generateAssignments();
      if (response.error) {
        toast.error(response.error);
        return;
      }
      if (response.data && typeof response.data === 'object') {
        if(response.data?.assignments)
        setCurrentAssignments(response.data.assignments);
        console.log(response.data,'response.data')
        toast.success('Secret Santa assignments generated successfully!');
      }
    } catch (error) {
      toast.error('Failed to generate assignments');
    }
  };

  const handleDownload = async () => {
    try {
      const response = await downloadAssignments();
      if (response.error) {
        toast.error(response.error);
        return;
      }
      if (response.data) {
        const url = window.URL.createObjectURL(response.data);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'secret-santa-assignments.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success('Assignments downloaded successfully!');
      }
    } catch (error) {
      toast.error('Failed to download assignments');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Secret Santa Assignments</h1>
        <p className="mt-2 text-gray-600">
          Generate and view this year's Secret Santa assignments
        </p>
      </div>

      {employees.length === 0 ? (
        <div className="text-center py-12">
          <Gift className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No Employees</h3>
          <p className="mt-1 text-sm text-gray-500">
            Please upload your employee list first
          </p>
        </div>
      ) : currentAssignments.length === 0 ? (
        <div className="text-center">
          <button
            onClick={handleGenerateAssignments}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Generate Assignments
            <Gift className="ml-2 -mr-1 h-5 w-5" />
          </button>
        </div>
      ) : (
        <div>
          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                          Giver
                        </th>
                        <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Receiver
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {currentAssignments?.map((assignment, index) => (
                        <tr key={index}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                            {assignment.Employee_Name}
                            <span className='text-slate-400 pl-1'>{assignment.Employee_EmailID}</span>
                            {assignment.Employee_Team && <span className='text-black pl-1'>(Team {assignment.Employee_Team})</span>}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                            {assignment.Secret_Child_Name}
                           <span className='text-slate-400 pl-1'> {assignment.Secret_Child_EmailID}</span>
                            {assignment.Employee_Team && <span className='text-black pl-1'>(Team {assignment.Secret_Child_Team})</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
          <button
            onClick={handleGenerateAssignments}
            className="inline-flex items-center mr-2 px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Regenerate Assignments
            <Gift className="ml-2 -mr-1 h-5 w-5" />
          </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
            >
              Download Assignments
              <Download className="ml-2 -mr-1 h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}