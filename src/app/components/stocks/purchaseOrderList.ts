import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../../app.constants';
import { PurchaseOrder, PurchaseOrderProduct } from '../../models/stocks/purchaseOrder';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../../models/user';  
import { GenericService, PurchasingService } from '../../services';

@Component({
  selector: 'app-purchaseOrder-list',
  templateUrl: '../../pages/stocks/purchaseOrderList.html',
  providers: [GenericService, PurchasingService]
})
export class PurchaseOrderList implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  purchaseOrders: PurchaseOrder[] = [];
  cols: any[];
  
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;  
  
  constructor
    (
    private genericService: GenericService,
    private purchasingService: PurchasingService,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    ) {

    
  }

  ngOnInit(): void {
    this.cols = [
            { field: 'purchaseOrderDate', header: 'Date', type:'date' },
            { field: 'supplierName', header: 'Supplier' },
            { field: 'requestorName', header: 'Requestor' },
            { field: 'receiverName', header: 'Receiver' },
            { field: 'subTotal', header: 'Sub Total' },
            { field: 'taxes', header: 'Taxes' },
            { field: 'discount', header: 'Discount' },
            { field: 'grandTotal', header: 'Grand Total' },
            { field: 'due', header: 'Due' },
            { field: 'status', header: 'Status', type:'string' }
        ];
    
    this.route
        .queryParams
        .subscribe(params => {          
          
            let parameters: string [] = []; 
            
            parameters.push('e.status = |status|0|Integer')
            
            this.genericService.getAllByCriteria('com.qkcare.model.stocks.PurchaseOrder', parameters)
              .subscribe((data: PurchaseOrder[]) => 
              { 
                this.purchaseOrders = data 
              },
              error => console.log(error),
              () => console.log('Get all PurchaseOrders complete'));
          });
  }
 
  
  ngOnDestroy() {
    this.purchaseOrders = null;
  }
  
  edit(purchaseOrderId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "purchaseOrderId": purchaseOrderId,
        }
      }
      this.router.navigate(["/admin/purchaseOrderDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

  delete(purchaseOrderId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "purchaseOrderId": purchaseOrderId,
        }
      }
      this.router.navigate(["/admin/purchaseOrderDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

 }
