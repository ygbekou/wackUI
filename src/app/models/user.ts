import {Country} from '../models/country';
import { UserGroup } from './userGroup';


export class User {
  id: number;
  userGroup: UserGroup;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  picture: string;
  sex: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  status: number;
}