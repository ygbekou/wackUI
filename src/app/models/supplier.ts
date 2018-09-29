import { Country } from './country';
import { Reference } from './reference';

export class Supplier {
  id: number;
  name: string;
  contactName: string;
  address: string;
  city: string;
  country: Country;
  zipCode
  email: string;
  homePhone: string;
  mobilePhone: string;
  fax: string;
  status: number;
}