import { User } from './user';

export class Employee {
  id: number;
  user: User = new User();
  designation: string;
  resume: string;
  managing: number;
  status: number;
  name: string;

  constructor() {
    this.managing = 1;
  }
}
