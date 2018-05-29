import { Account } from './account';

export class InvoiceAccount {
  id: number;
  account: Account;
  description: string;
  quantity: number;
  unitPrice: number;
  subTotal: number;
}