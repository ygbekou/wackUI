import { Product } from '../product';
import { PurchaseOrder } from './purchaseOrder';

export class ReceiveOrder {
  id: number;
  purchaseOrder: PurchaseOrder;
  deliveryNote: string;
  deliveryDate: Date = new Date();
  packagingSlip: string;
  apReference: number;
  status: number;
  
  receiveOrderProducts: ReceiveOrderProduct[] = [];
  
  
  constructor() {
    this.receiveOrderProducts.push(new ReceiveOrderProduct())
  }
  
}

export class ReceiveOrderProduct {
  id: number;
  product: Product;
  quantity: number;
  unitPrice: number;
  notes: string;
  originalQuantity: number;
}