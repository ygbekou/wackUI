import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../../app.constants';
import { ReceiveOrder, ReceiveOrderProduct } from '../../models/stocks/receiveOrder';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../../models/user';  
import { GenericService, PurchasingService } from '../../services';

@Component({
  selector: 'app-receiveOrder-list',
  templateUrl: '../../pages/stocks/receiveOrderList.html',
  providers: [GenericService, PurchasingService]
})
export class ReceiveOrderList implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  receiveOrders: ReceiveOrder[] = [];
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
            { field: 'deliveryDate', header: 'Delivery Date', type:'date' },
            { field: 'deliveryNote', header: 'Delivery Note' },
            { field: 'purchaseOrderId', header: 'PO ID' },
            { field: 'purchaseOrderDate', header: 'Order Date' },
            { field: 'status', header: 'Status', type:'string' }
        ];
    
    this.route
        .queryParams
        .subscribe(params => {          
          
            let parameters: string [] = []; 
            
            parameters.push('e.status = |status|0|Integer')
            
            this.genericService.getAllByCriteria('com.qkcare.model.stocks.ReceiveOrder', parameters)
              .subscribe((data: ReceiveOrder[]) => 
              { 
                this.receiveOrders = data 
              },
              error => console.log(error),
              () => console.log('Get all ReceiveOrder complete'));
          });
  }
 
  
  ngOnDestroy() {
    this.receiveOrders = null;
  }
  
  edit(receiveOrderId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "receiveOrderId": receiveOrderId,
        }
      }
      this.router.navigate(["/admin/receiveOrderDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

  delete(receiveOrderId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "receiveOrderId": receiveOrderId,
        }
      }
      this.router.navigate(["/admin/receiveOrderDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

 }
