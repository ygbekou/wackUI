import { HospitalLocation } from './';
import { Department } from './';
import { Employee } from './';
import { Patient } from './';
import { Weekday } from './';

export class Appointment {
  id: number;
  doctor: Employee = new Employee();
  department: Department = new Department();
  patient: Patient = new Patient();
  hospitalLocation: HospitalLocation = new HospitalLocation();
  appointmentDate: Date;
  appointmentDateStr: string;
  beginTime: string;
  endTime: string;
  problem: string;
  status: number;
  
  doctorName: string;
  departmentName: string;
}