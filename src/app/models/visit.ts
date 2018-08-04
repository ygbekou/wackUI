import { Employee } from './Employee';
import { Patient } from './patient';
import { Reference } from './reference';
import { VitalSign } from './vitalSign';

export class Visit {
  id: number;
  visitNumber: string;
  patient: Patient;
  visitDatetime: Date = new Date();
  status: number;
  
  vitalSign: VitalSign;
  allergies: Reference[];
  
  constructor() {
    this.vitalSign = new VitalSign(); 
    this.allergies = [];
  }
  
}