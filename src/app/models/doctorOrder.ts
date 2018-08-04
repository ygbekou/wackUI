import { Appointment } from './appointment';
import { Employee } from './employee';
import { Reference } from './reference';

export class DoctorOrder {
  id: number;
  appointment: Appointment;
  doctorOrderType: Reference;
  doctorOrderPriority: Reference;
  doctorOrderKind: Reference;
  doctor: Employee;
  doctorOrderDatetime: Date;
  receivedDatetime: Date;
  description: string;
  status: number;
  
}