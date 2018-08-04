import { Employee } from './employee';

export class DoctorAssignment {
  id: number;
  doctor: Employee;
  startDate: Date;
  endDate: Date;
  transferDoctor: Employee;
  transferDate: Date;
}