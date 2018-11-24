import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '../../app.constants';
import { Product, Supplier, User } from '../../models';
import { PurchaseOrder, PurchaseOrderProduct } from '../../models/stocks/purchaseOrder';
import { EditorModule } from 'primeng/editor';
import { EmployeeDropdown, SupplierDropdown, ProductDropdown } from '../dropdowns';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { InputTextareaModule, CheckboxModule, MultiSelectModule, CalendarModule } from 'primeng/primeng';
import { GenericService, PurchasingService } from '../../services';
import { TranslateService, LangChangeEvent} from '@ngx-translate/core';
import { Message } from 'primeng/api';

@Component({  
  selector: 'app-purchaseOrder-details',
  templateUrl: '../../pages/stocks/purchaseOrderDetails.html',
  providers: [GenericService, PurchasingService, EmployeeDropdown, SupplierDropdown, ProductDropdown]
})
export class PurchaseOrderDetails implements OnInit, OnDestroy {
  
  messages: Message[] = [];
  purchaseOrder: PurchaseOrder = new PurchaseOrder();
  orderProductCols: any[];
  
  constructor
    (
      private genericService: GenericService,
      private purchaseOrderService: PurchasingService,
      private translate: TranslateService,
      private supplierDropdown: SupplierDropdown,
      private productDropdown: ProductDropdown,
      private employeeDropdown: EmployeeDropdown,
      private changeDetectorRef: ChangeDetectorRef,
      private route: ActivatedRoute,
      private router: Router
    ) {

  }

  ngOnInit(): void {

     this.orderProductCols = [
            { field: 'product', header: 'Name', headerKey: 'COMMON.NAME' },
            { field: 'productDescription', header: 'Description', headerKey: 'COMMON.DESCRIPTION' },
            { field: 'quantity', header: 'Quantity', type: 'amount', headerKey: 'COMMON.QUANTITY'},
            { field: 'unitPrice', header: 'Price', type: 'amount', headerKey: 'COMMON.PRICE'},
            { field: 'totalAmount', header: 'Total', type: 'amount', headerKey: 'COMMON.TOTAL'}
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
              })
          } else {
              
          }
     });
   
    this.updateCols();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.updateCols();
    });
  }
 
  
  updateCols() {
    for (var index in this.orderProductCols) {
      let col = this.orderProductCols[index];
      this.translate.get(col.headerKey).subscribe((res: string) => {
        col.header = res;
      });
    }
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
  
  validate() {
    let noProductFound: boolean = true;
    
    for (let i in this.purchaseOrder.purchaseOrderProducts) {
      let pop = this.purchaseOrder.purchaseOrderProducts[i];
      if (pop.product && pop.product.id > 0) {
        noProductFound = false;
        if (pop.quantity == null)
          this.messages.push({severity:Constants.ERROR, summary:Constants.SAVE_LABEL, detail:'Quantity is required.'});
        if (pop.unitPrice == null)
          this.messages.push({severity:Constants.ERROR, summary:Constants.SAVE_LABEL, detail:'Price is required.'});
        
      }
    }
    
    if (noProductFound) {
      this.messages.push({severity:Constants.ERROR, summary:Constants.SAVE_LABEL, detail:'At least 1 product is required.'});
    }
    
    return this.messages.length == 0;
  }
  
  save() {
    
    try {
      this.messages = [];
      
      this.messages = [];
       if (!this.validate()) {
        return;
      }
      
      this.purchaseOrderService.savePurchaseOrder(this.purchaseOrder)
        .subscribe(result => {
          if (result.id > 0) {
            this.purchaseOrder = result
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


  populateDefaultProductValues(rowData: PurchaseOrderProduct) {
    rowData.unitPrice = rowData.product.price;
  }
  
  delete() {
  
  }
  
  clear() {
  
  }
 }
