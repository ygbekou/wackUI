import { Admission } from './admission';
import { Appointment } from './appointment';
import { Employee } from './employee';
import { Reference } from './reference';
import { Visit } from './visit';

export class DoctorOrder {
  id: number;
  admission: Admission;
  visit: Visit;
  doctorOrderType: Reference;
  doctorOrderPriority: Reference;
  doctorOrderKind: Reference;
  doctor: Employee;
  doctorOrderDatetime: Date;
  receivedDatetime: Date;
  description: string;
  status: number;
  
  constructor() {
  }
  
}