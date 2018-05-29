import { Employee } from './Employee';
import { Insurance } from './insurance';
import { Package } from './package';
import { Patient } from './patient';

export class PatientAdmission {
  id: number;
  patient: Patient;
  pckage: Package;
  doctor: Employee;
  insurance: Insurance;
  policyNumber: string;
  contactName: string;
  contactRelation: string;
  contactPhone: string;
  contactAddress: string;
  status: number;
  
}