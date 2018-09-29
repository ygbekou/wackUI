import { Admission } from './admission';
import { Appointment } from './appointment';
import { Employee } from './employee';
import { LabTest } from './labTest';
import { Product } from './product';
import { Reference } from './reference';
import { Service } from './service';
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
  
  labTests: LabTest[] = [];
  products: Product[] = [];
  
  constructor() {
    this.doctorOrderType = new Reference();
  }
  
}