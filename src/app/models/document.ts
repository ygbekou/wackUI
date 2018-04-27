import { Employee } from './employee';
import { Patient } from './patient';

export class Document                                                                                                                                                {
  id: number;
  patient: Patient;
  doctor: Employee;
  filePath: string;
  description: string;
  status: number;
}