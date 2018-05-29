import { Account } from './account';

export class Payment                                                                                                                                                {
  id: number;
  account: Account;
  payTo: string;
  description: string;
  amount: number;
  accountName: string;
  status: number;
}