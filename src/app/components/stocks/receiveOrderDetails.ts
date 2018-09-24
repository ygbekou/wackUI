import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '../../app.constants';
import { Product } from '../../models/product';
import { PurchaseOrder, PurchaseOrderProduct } from '../../models/stocks/purchaseOrder';
import { ReceiveOrder } from '../../models/stocks/receiveOrder';
import { Supplier } from '../../models/supplier';
import { EditorModule } from 'primeng/editor';
import { EmployeeDropdown, SupplierDropdown, ProductDropdown } from '../dropdowns';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule, MultiSelectModule, CalendarModule } from 'primeng/primeng';
import { User } from '../../models/user';  
import { GenericService, PurchasingService } from '../../services';
 
@Component({  
  selector: 'app-receiveOrder-details',
  templateUrl: '../../pages/stocks/receiveOrderDetails.html',
  providers: [GenericService, PurchasingService, EmployeeDropdown, SupplierDropdown, ProductDropdown]
})
export class ReceiveOrderDetails implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  receiveOrder: ReceiveOrder = new ReceiveOrder();
  orderProductCols: any[];
  
  supplierDropdown: SupplierDropdown;
  productDropdown: ProductDropdown;
  
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;  
  SELECT_OPTION: string = Constants.SELECT_OPTION;
  
  purchaseOrderId: number;
  
  constructor
    (
      private genericService: GenericService,
      private purchasingService: PurchasingService,
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
            { field: 'productName', header: 'Name' },
            { field: 'productDescription', header: 'Description' },
            { field: 'originalQuantity', header: 'Quantity Ordered', type: 'amount'},
            { field: 'quantity', header: 'Quantity Received', type: 'amount'},
            { field: 'notes', header: 'Notes'}
        ]; 
    
    let receiveOrderId = null;
    this.route
        .queryParams
        .subscribe(params => {          
          
          receiveOrderId = params['receiveOrderId'];
          
          if (receiveOrderId != null) {
              this.purchasingService.getReceiveOrder(receiveOrderId)
                  .subscribe(result => {
                if (result.id > 0) {
                  this.receiveOrder = result
                }
                else {
                  this.error = Constants.SAVE_UNSUCCESSFUL;
                  this.displayDialog = true;
                }
              })
          } else {
              
          }
     });
    
    console.info(this.receiveOrder)
  }
  
  ngOnDestroy() {
    this.receiveOrder = null;
  }
 
  
  private getNumber(value: number): number {
    return value != undefined ? value : 0;
  } 
  
  save(status: number) {
    this.receiveOrder.status = status;
    
    try {
      this.error = '';
      this.purchasingService.saveReceiveOrder(this.receiveOrder)
        .subscribe(result => {
          if (result.id > 0) {
            this.receiveOrder = result
            console.info(this.receiveOrder);
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
  
  lookUpPurchaseOrder() {
    
    this.purchasingService.getNewReceiveOrder(this.purchaseOrderId)
      .subscribe((data: ReceiveOrder) => 
      { 

        this.receiveOrder = data;
        console.info(this.receiveOrder)
        
      },
      error => console.log(error),
      () => console.log('Get PurchaseOrder complete'));
  }

 }
