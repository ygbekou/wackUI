import { User } from './user';

export class Employee {
  id: number;
  user: User = new User();
  designation: string;
  resume: string;
  managing: number;
  status: number;
  name: string;
  modifierName: string;

  type = 'Employee';

  constructor() {
    this.managing = 1;
  }
}
