import { Appointment } from './appointment';

export class VitalSign {
  id: number;
  appointment: Appointment;
  vitalSignDatatime: Date = new Date();
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