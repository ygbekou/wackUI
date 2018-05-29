import { Department } from './department';
import { Employee } from './employee';
import { Patient } from './patient';
import { Weekday } from './weekday';

export class Appointment {
  id: number;
  doctor: Employee = new Employee();
  department: Department = new Department();
  patient: Patient = new Patient();
  appointmentDate: Date;
  beginTime: string;
  endTime: string;
  problem: string;
  status: number;
  
  doctorName: string;
  departmentName: string;
}