import { Reference } from './reference';

export class Floor {
  id: number;
  name: string;
  description: string;
  status: number;
  building: Reference;
}