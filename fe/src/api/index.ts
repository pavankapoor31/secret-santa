import { Employee, Assignment, ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export async function uploadEmployees(file: File): Promise<ApiResponse<Employee[]>> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${API_BASE_URL}/upload-employees`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: 'Failed to upload employees' };
  }
}

export async function uploadPreviousAssignments(file: File): Promise<ApiResponse<Assignment[]>> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${API_BASE_URL}/upload-previous-assignments`, {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: 'Failed to upload previous assignments' };
  }
}

export async function generateAssignments(): Promise<ApiResponse<Assignment[]>> {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-assignments`, {
      method: 'POST',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: 'Failed to generate assignments' };
  }
}

export async function downloadAssignments(): Promise<ApiResponse<Blob>> {
  try {
    const response = await fetch(`${API_BASE_URL}/download-assignments`);
    const blob = await response.blob();
    return { data: blob };
  } catch (error) {
    return { error: 'Failed to download assignments' };
  }
}