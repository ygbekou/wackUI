
import { UserGroup } from './userGroup';
import { Country } from './website';


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
  homePhone: string;
  mobilePhone: string;
  address: string;
  city: string;
  country: Country;
  zipCode: string;
  birthDate: Date;
  status: number;

  // Transients
  confirmPassword: string;

  type = 'User';

  constructor() {
    this.userGroup = new UserGroup();
    this.country = new Country();
  }
}
