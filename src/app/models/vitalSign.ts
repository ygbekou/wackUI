import { Admission } from './';

export class VitalSign {
  id: number;
  admission: Admission;
  vitalSignDatetime: Date = new Date();
  temperature: number;
  pulse: string;
  respiration: string;
  bloodPressure: string;
  bloodSugar: number;
  pain: string;
  weight: number;
  height: number;
  bmi: number;
  
}