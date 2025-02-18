export interface Employee {
  id: string;
  name: string;
  email: string;
  department?: string;
}

export interface Assignment {
  giver: Employee;
  receiver: Employee;
}

export interface CSVData {
  data: any[];
  errors: any[];
  meta: {
    delimiter: string;
    linebreak: string;
    aborted: boolean;
    truncated: boolean;
    cursor: number;
  };
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}