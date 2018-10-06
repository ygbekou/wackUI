
import { Country } from './';

export class HospitalLocation {
  id: number;
  name: string;
  description: string;
  address: string;
  city: string;
  country: Country;
  zipCode: string;
  phone: string;
  status: number = 0;
}