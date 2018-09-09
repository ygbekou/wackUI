import { Appointment } from './appointment';
import { BillPayment } from './billPayment';
import { BillService } from './billService';
import { Admission } from './admission';
import { Visit } from './visit';

export class Bill {
  id: number;
  admission: Admission;
  visit: Visit;
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