import { Reference } from './reference';

export class ReferenceWithCategory {
  id: number;
  category: Reference;
  name: string;
  description: string;
  status: number;
  
  constructor () {
    this.category = new Reference();
  }
}