export interface Employee {
  id: string;
  name: string;
  email: string;
  department?: string;
}

export interface Assignment {
  Employee_Name:string,
  Employee_EmailID:string,
  Employee_Team:string,
  Secret_Child_Name:string,
  Secret_Child_EmailID:string,
  Secret_Child_Team:string
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