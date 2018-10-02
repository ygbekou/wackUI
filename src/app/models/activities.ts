import { Admission } from './admission';

export class BirthReport {
  id: number;
  admission: Admission;
  birthDatetime: Date;
  comments: string;
  lastName: string;
  firstName: string;
  middleName: string;
  fatherLastName: string;
  fatherFirstName: string;
  fatherMiddleName: string;
  motherLastName: string;
  motherFirstName: string;
  motherMiddleName: string;
  
}

export class DeathReport {
  id: number;
  admission: Admission;
  deathDatetime: Date;
  comments: string;
  
}