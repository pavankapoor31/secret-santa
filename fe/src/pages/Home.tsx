import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Upload as UploadIcon, FileSpreadsheet } from 'lucide-react';

export function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <Gift className="mx-auto h-12 w-12 text-red-500" />
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Secret Santa Game
        </h1>
        <p className="mt-4 text-lg text-gray-500">
          Organize your office Secret Santa with ease! Upload your employee list and let us handle the
          rest.
        </p>
      </div>

      <div className="mt-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:shadow-md">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UploadIcon className="h-8 w-8 text-indigo-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Upload Employee List</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Start by uploading your current employee list in CSV format.
                </p>
              </div>
            </div>
          </div>

          <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:shadow-md">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileSpreadsheet className="h-8 w-8 text-green-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Previous Assignments</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Optionally upload last year's assignments to avoid repeats.
                </p>
              </div>
            </div>
          </div>

          <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:shadow-md">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Gift className="h-8 w-8 text-red-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Generate Assignments</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Let our algorithm create perfect Secret Santa pairs.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            to="/upload"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Get Started
            <UploadIcon className="ml-2 -mr-1 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}