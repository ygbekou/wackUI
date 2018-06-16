import { Bill } from './bill';

export class BillPayment                                                                                                                                                {
  id: number;
  bill: Bill;
  description: string;
  amount: number;
}