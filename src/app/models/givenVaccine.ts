import { Reference } from './reference';

export class GivenVaccine {
  id: number;
  vaccine: Reference;
  givenDate: Date;
  
  constructor() {
    this.vaccine = new Reference();
  }
}