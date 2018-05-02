import { User } from './user';

export class Patient {
  id: number;
  matricule: string;
  user: User;
  contact: string;
  contactPhone: string;
  medicalHistory: string;
  name: string;
  status: number;
}