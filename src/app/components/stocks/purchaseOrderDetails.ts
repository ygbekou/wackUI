import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '../../app.constants';
import { Product } from '../../models/product';
import { PurchaseOrder, PurchaseOrderProduct } from '../../models/stocks/purchaseOrder';
import { Supplier } from '../../models/supplier';
import { EditorModule } from 'primeng/editor';
import { EmployeeDropdown, SupplierDropdown, ProductDropdown } from '../dropdowns';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule, MultiSelectModule, CalendarModule } from 'primeng/primeng';
import { User } from '../../models/user';  
import { GenericService, PurchasingService } from '../../services';
 
@Component({  
  selector: 'app-purchaseOrder-details',
  templateUrl: '../../pages/stocks/purchaseOrderDetails.html',
  providers: [GenericService, PurchasingService, EmployeeDropdown, SupplierDropdown, ProductDropdown]
})
export class PurchaseOrderDetails implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  purchaseOrder: PurchaseOrder = new PurchaseOrder();
  orderProductCols: any[];
  
  supplierDropdown: SupplierDropdown;
  productDropdown: ProductDropdown;
  
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;  
  SELECT_OPTION: string = Constants.SELECT_OPTION;
  
  constructor
    (
      private genericService: GenericService,
      private purchaseOrderService: PurchasingService,
      private splDropdown: SupplierDropdown,
      private pdtDropdown: ProductDropdown,
      private employeeDropdown: EmployeeDropdown,
      private changeDetectorRef: ChangeDetectorRef,
      private route: ActivatedRoute,
      private router: Router
    ) {
    this.supplierDropdown = splDropdown;
    this.productDropdown = pdtDropdown;
  }

  ngOnInit(): void {

     this.orderProductCols = [
            { field: 'product', header: 'Name' },
            { field: 'productDescription', header: 'Description' },
            { field: 'quantity', header: 'Quantity', type: 'amount'},
            { field: 'unitPrice', header: 'Price', type: 'amount'},
            { field: 'totalAmount', header: 'Total', type: 'amount'}
        ]; 
    
    let purchaseOrderId = null;
    this.route
        .queryParams
        .subscribe(params => {          
          
          purchaseOrderId = params['purchaseOrderId'];
          
          if (purchaseOrderId != null) {
              this.purchaseOrderService.getPurchaseOrder(purchaseOrderId)
                  .subscribe(result => {
                if (result.id > 0) {
                  this.purchaseOrder = result
                  if (this.purchaseOrder.purchaseOrderProducts.length == 0) 
                    this.addRow();
                }
                else {
                  this.error = Constants.SAVE_UNSUCCESSFUL;
                  this.displayDialog = true;
                }
              })
          } else {
              
          }
     });
    
    console.info(this.purchaseOrder)
  }
  
  ngOnDestroy() {
    this.purchaseOrder = null;
  }
  
  addRow() {
    let pop =  new PurchaseOrderProduct();
    pop.product = new Product();
    this.purchaseOrder.purchaseOrderProducts.push(pop);
  }
  
  calculateGrandTotal() {
    this.purchaseOrder.grandTotal = +this.getNumber(this.purchaseOrder.subTotal) + +this.getNumber(this.purchaseOrder.taxes)
                    - +this.getNumber(this.purchaseOrder.discount);
  }
  
  calculateDue() {
    this.purchaseOrder.due = +this.purchaseOrder.grandTotal - +this.getNumber(this.purchaseOrder.paid);
  }
  
  calculateTotal() {
    this.purchaseOrder.subTotal = 0;
    for (let i in this.purchaseOrder.purchaseOrderProducts) {
       this.purchaseOrder.subTotal += this.calculateRowTotal(this.purchaseOrder.purchaseOrderProducts[i]);
    }
  }
  
  calculateRowTotal(rowData) {
    rowData.totalAmount = (+this.getNumber(rowData.quantity) * +this.getNumber(rowData.unitPrice));
    return rowData.totalAmount;
    
  }
  
  private getNumber(value: number): number {
    return value != undefined ? value : 0;
  } 
  
  save() {
    
    try {
      this.error = '';
      this.purchaseOrderService.savePurchaseOrder(this.purchaseOrder)
        .subscribe(result => {
          if (result.id > 0) {
            this.purchaseOrder = result
            console.info(this.purchaseOrder);
          }
          else {
            this.error = Constants.SAVE_UNSUCCESSFUL;
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }


  populateDefaultProductValues(rowData: PurchaseOrderProduct) {
    rowData.unitPrice = rowData.product.price;
  }
 }
