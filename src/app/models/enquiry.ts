import { User } from './';
export class Enquiry {
  id: number;
  enquiryDatetime: Date;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phone: string;
  notes: string;
  checkedBy: User;
  read: string;
  status: number;
  
  constructor() {
    
  }
}