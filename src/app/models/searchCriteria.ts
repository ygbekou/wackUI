import { HospitalLocation } from './';
import { Department, Employee } from './';

export class SearchCriteria {
  id: number;
  lastName: string;
  firstName: string;
  birthDate: Date;
  departmentId: number;
  hospitalLocationId: number;
  doctorId: number;
  
}