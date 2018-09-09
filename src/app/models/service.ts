import { Reference } from './reference';

export class Service {
  id: number;
  serviceType: Reference;
  name: string;
  description: string;
  quantity: number;
  rate: number;
  status: number = 0;
  statusDesc: string;
}