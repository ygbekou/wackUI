import { Reference } from './reference';

export class Medicine {
  id: number;
  category: Reference;
  manufacturer: Reference;
  name: string;
  description: string;
  price: number;
  status: number;
}