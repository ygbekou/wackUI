import { Country } from './country';
import { Insurance } from './insurance';
import { Reference } from './reference';
import { User } from './user';

export class Patient {
  id: number;
  matricule: string;
  user: User;
  religion: Reference;
  occupation: Reference;
  nationality: Country;
  contact: string;
  contactPhone: string;
  medicalHistory: string;
  name: string;
  bloodGroup: string;
  status: number;
  payerType: Reference;
  employer: string;
  authorizationLetterNumber: string;
  expiryDate: Date;
  employeeId: string;
  insurance: Insurance;
  policyNumber: string;
  insuranceExpiryDate: Date;
}