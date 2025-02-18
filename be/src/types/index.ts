export interface Employee {
  Employee_Name: string;
  Employee_EmailID: string;
}

export interface Assignment {
  Employee_Name:string,
  Employee_EmailID:string,
  Secret_Child_Name:string,
  Secret_Child_EmailID:string
}

export interface PreviousAssignment {
  santa: string;
  recipient: string;
  year: number;
}