import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '../../app.constants';
import { Product, Supplier, User } from '../../models';
import { PurchaseOrder, PurchaseOrderProduct } from '../../models/stocks/purchaseOrder';
import { ReceiveOrder } from '../../models/stocks/receiveOrder';
import { EditorModule } from 'primeng/editor';
import { EmployeeDropdown, SupplierDropdown, ProductDropdown } from '../dropdowns';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { InputTextareaModule, CheckboxModule, MultiSelectModule, CalendarModule } from 'primeng/primeng';
import { GenericService, PurchasingService } from '../../services';
import { Message } from 'primeng/api';
 
@Component({  
  selector: 'app-receiveOrder-details',
  templateUrl: '../../pages/stocks/receiveOrderDetails.html',
  providers: [GenericService, PurchasingService, EmployeeDropdown, SupplierDropdown, ProductDropdown]
})
export class ReceiveOrderDetails implements OnInit, OnDestroy {
  
  receiveOrder: ReceiveOrder = new ReceiveOrder();
  orderProductCols: any[];
  messages: Message[] = [];
  supplierDropdown: SupplierDropdown;
  productDropdown: ProductDropdown;
  
  purchaseOrder: PurchaseOrder = new PurchaseOrder();
  
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
              this.genericService.getNewObject('/service/purchasing/receiveOrder/', receiveOrderId)
                  .subscribe(result => {
                if (result.id > 0) {
                  this.receiveOrder = result
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
      this.messages = [];
      this.purchasingService.saveReceiveOrder(this.receiveOrder)
        .subscribe(result => {
          if (result.id > 0) {
            this.receiveOrder = result
            this.messages.push({severity:Constants.SUCCESS, summary:Constants.SAVE_LABEL, detail:Constants.SAVE_SUCCESSFUL});
          }
          else {
             this.messages.push({severity:Constants.ERROR, summary:Constants.SAVE_LABEL, detail:Constants.SAVE_UNSUCCESSFUL});
          }
        }) 
    }
    catch (e) {
      console.log(e);
    }
  }
  
  lookUpPurchaseOrder(event) {
    this.purchaseOrder = event;
    
    if (this.purchaseOrder && this.purchaseOrder.id > 0) {
      this.purchasingService.getNewReceiveOrder(this.purchaseOrder.id)
      .subscribe((data: ReceiveOrder) => 
      { 
  
        this.receiveOrder = data;
        console.info(this.receiveOrder)
        
      },
      error => console.log(error),
      () => console.log('Get PurchaseOrder complete'));
    }
  }

 }
