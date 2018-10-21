import { Product } from '../product';
import { PatientSale } from './patientSale';

export class SaleReturn {
  id: number;
  patientSale: PatientSale;
  comments: string;
  returnDatetime: Date = new Date();
  subTotal: number;
  taxes: number;
  discount: number;
  grandTotal: number;
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
  totalAmount: number;
  discountPercentage: number;
  discountAmount: number;
  originalQuantity: number;
}