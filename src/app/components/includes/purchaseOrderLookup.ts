import { Constants } from '../../app.constants';
import { User } from '../../models';
import { PurchaseOrder } from '../../models/stocks/purchaseOrder';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { GenericService, AppointmentService } from '../../services';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-purchase_order-lookup',
  template: `<div class="ui-grid ui-grid-responsive ui-fluid">
              <div class="ui-grid-row">
                <div class="ui-grid-col-5 ui-sm-12">  
                  <div class="ui-grid-row">
                     <div class="form-group"> 
                        <label i18n="@@purchaseOrderId" for="purchaseOrderId">Purchase Order ID</label>
                        <form (ngSubmit)="search()" #searchForm="ngForm">
                          <input type="text" pInputText class="form-control" id="searchT"
                            required [(ngModel)]="schText" (change)="lookUpPurchaseOrder($event)"
                            placeholder="{{SEARCH_TEXT}}" name="searchT"
                            #searchT="ngModel">
                        </form>
                     </div>
                     <div>
                        <br/>
                        <button type="button" pButton icon="fa fa-search" (click)="openPurchaseOrderSearchPage()"></button>    
                     </div>
                  </div>
                </div>
                <div class="ui-grid-col-6 ui-sm-12">
                  <div class="ui-grid-row">
                    <div class="ui-grid-col-4 ui-sm-12">
                      Purchase Order ID:
                    </div>
                    <div class="ui-grid-col-4 ui-sm-12">
                      {{purchaseOrder.id}}
                    </div>
                    <div class="ui-grid-col-4 ui-sm-12">
                      Requestor:
                    </div>
                    <div class="ui-grid-col-4 ui-sm-12">
                      {{purchaseOrder.requestor.name}}
                    </div>      
                  </div>
                  <div class="ui-grid-row">
                    <div class="ui-grid-col-4 ui-sm-12">
                      Supplier:
                    </div>
                    <div class="ui-grid-col-4 ui-sm-12">
                      {{purchaseOrder.supplier.name}}
                    </div>
                  </div>
                  <div class="ui-grid-row">
                    <div class="ui-grid-col-4 ui-sm-12">
                      Order Date:
                    </div>
                    <div class="ui-grid-col-4 ui-sm-12">
                      {{purchaseOrder.purchaseOrderDate | date:'dd/MM/yyyy'}}
                    </div>
                  </div>      
                </div>
              </div>
             </div>`
})
  
  
export class PurchaseOrderLookup implements OnInit {
   
  @Input() purchaseOrder: PurchaseOrder = new PurchaseOrder();
  @Output() purchaseOrderEmit: EventEmitter<PurchaseOrder> = new EventEmitter<PurchaseOrder>();
  @Input() schText: string;
  @Input() originalPage: string;
  
  SEARCH_TEXT: string = "ORDER ID";
  
  constructor(
        private genericService: GenericService,
        private router: Router
    ) {

  }
  
  ngOnInit() {
  
  }
  
  openPatientSearchPage() {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "originalPage": this.originalPage,    
        }
      }
      this.router.navigate(["/admin/purchaseOrderList"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

  lookUpPurchaseOrder() {
    let parameters: string [] = []; 
    let purchaseOrder = null;
            
    parameters.push('e.id = |purchaseOrderId|' + this.schText + '|Long')
    
    this.genericService.getAllByCriteria('PurchaseOrder', parameters)
      .subscribe((data: PurchaseOrder[]) => 
      { 
        if (data.length > 0) {
          this.purchaseOrder = data[0];
        } else {
          this.purchaseOrder = new PurchaseOrder();
        }
        this.purchaseOrderEmit.emit(this.purchaseOrder);
      },
      error => console.log(error),
      () => console.log('Get Purchase orders complete'));
  }
}
