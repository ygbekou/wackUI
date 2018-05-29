import { InvoiceAccount } from './invoiceAccount';
import { Patient } from './patient';

export class Invoice {
  id: number;
  patient: Patient;
  invoiceDate: Date = new Date();
  subTotal: number;
  taxes: number;
  discount: number;
  grandTotal: number;
  paid: number;
  due: number;
  status: number;
  
  invoiceAccounts: InvoiceAccount[] = [];
  
}