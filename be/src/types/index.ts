export interface Employee {
  Employee_Name: string;
  Employee_EmailID: string;
  Employee_Team:string;
}

export interface Assignment {
  Employee_Name:string,
  Employee_EmailID:string,
  Employee_Team:string,
  Secret_Child_Name:string,
  Secret_Child_EmailID:string,
  Secret_Child_Team:string
}

export interface PreviousAssignment {
  santa: string;
  recipient: string;
  year: number;
}