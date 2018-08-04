import { Medicine } from './medicine';

export class PrescriptionMedicine {
  id: number;
  medicine: Medicine;
  medType: string;
  dosage: string;
  quantity: number;
  frequency: string;
  numberOfDays: number;
}