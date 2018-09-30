import { Product } from '../product';
import { PatientSale } from './patientSale';

export class SaleReturn {
  id: number;
  patientSale: PatientSale;
  comments: string;
  returnDatetime: Date = new Date();
  status: number;
  
  saleReturnProducts: SaleReturnProduct[] = [];
  
  
  constructor() {
    this.saleReturnProducts.push(new SaleReturnProduct())
  }
  
}

export class SaleReturnProduct {
  id: number;
  product: Product;
  quantity: number;
  unitPrice: number;
  originalQuantity: number;
}