import { Employee } from './employee';
import { Service } from './service';

export class BillService {
  id: number;
  service: Service;
  doctor: Employee;
  description: string;
  quantity: number;
  unitAmount: number;
  totalAmount: number;
  discountPercentage: number;
  discountAmount: number;
  payerAmount: number;
  patientAmount: number;
}