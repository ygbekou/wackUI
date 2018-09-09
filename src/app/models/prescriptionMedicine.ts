import { Product } from './product';

export class PrescriptionMedicine {
  id: number;
  medicine: Product;
  medType: string;
  dosage: string;
  quantity: number;
  frequency: string;
  numberOfDays: number;
}