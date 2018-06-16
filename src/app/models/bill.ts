import { Appointment } from './appointment';
import { BillPayment } from './billPayment';
import { BillService } from './billService';
import { PatientAdmission } from './patientAdmission';

export class Bill {
  id: number;
  patientAdmission: PatientAdmission;
  appointment: Appointment;
  billDate: Date = new Date();
  subTotal: number;
  taxes: number;
  discount: number;
  grandTotal: number;
  paid: number;
  due: number;
  status: number;
  
  billServices: BillService[] = [];
  billPayments: BillPayment[] = [];
  
}