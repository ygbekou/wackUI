import { Employee } from './employee';
import { Weekday } from './weekday';

export class Schedule {
  id: number;
  doctor: Employee;
  weekday: Weekday;
  beginTime: string;
  endTime: string;
  availableTimes: Date[] = [];
  perPatientTime: string;
  status: number;
}