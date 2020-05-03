import { Employee } from './employee';
import { Reference } from './reference';

export class Fund {
  id: number;
  receiver: Employee;
  receptionDate: Date;
  amount: number;
  description: string;
  status: number;
  modifierName: string;

  constructor() {
  }
}

export class Payment {
  id: number;
  paymentType: Reference;
  salaryMonth: Reference;
  salaryYear: number;
  receiver: Employee;
  contractLabor: ContractLabor;
  payer: Employee;
  paymentDate: Date;
  amount: number;
  description: string;
  status: number;
  modifierName: string;

  constructor() {
  }
}

export class Quote {
  id: number;
  quoter: Employee;
  quoteDate: Date;
  name: string;
  totalAmount: number;
  description: string;
  status: number;

  fileNames: string [];
  materials: Material [];
  contractLabors: ContractLabor[];

  // I need these fields for pdf print
  quoteDateStr: string;

  constructor() {
    this.totalAmount = 0;
  }
}

export class Material {
  id: number;
  product: Reference;
  quote: Quote;
  unitPrice: number;
  quantity: number;
  totalAmount: number;
  status: number;
  modifierName: string;
  productName: string;

  constructor() {
  }
}

export class ContractLabor {
  id: number;
  name: string;
  contractor: Employee;
  quote: Quote;
  contractDate: Date;
  amount: number;
  paid: number;
  balance: number;
  description: string;
  image: string;
  label: string;
  status: number;
  modifierName: string;

  constructor() {
  }
}

export class Supplier {
  id: number;
  name: string;
  contact: string;
  phone: string;
  email: string;
  address: string;

  constructor() {
  }
}

export class Purchase {
  id: number;
  product: Reference;
  primaryPurchaser: Employee;
  secondaryPurchaser: Employee;
  supplier: Supplier;
  purchaseDate: Date;
  unitAmount: number;
  quantity: number;
  totalAmount: number;
  receipt1: string;
  receipt2: string;
  receipt3: string;
  description: string;
  status: number;
  modifierName: string;

  constructor() {
  }
}


