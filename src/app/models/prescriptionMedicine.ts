import { Medicine } from './medicine';

export class PrescriptionMedicine {
  id: number;
  medicine: Medicine;
  medType: string;
  instructions: string;
}