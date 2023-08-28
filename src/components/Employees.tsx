export type EmployeeProps = {
    id: number;
    firstName: string;
    lastName: string;
    pole: {
      id: number;
      label: string;
    };
    jobType: {
      id: number;
      label: string;
    };
    jobTitle: {
      id: number;
      label: string;
    };
    jobDescription: string;
    monthlySalary: Record<string, any>;
    annualSalary: number;
    employmentType: string;
    familyQuotient: number;
    disabled: boolean;
    location: string;
    photo?: {
      id: number;
      url: string;
    };
  };
