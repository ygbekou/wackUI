import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../../app.constants';
import { ReceiveOrder, ReceiveOrderProduct } from '../../models/stocks/receiveOrder';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../../models/user';  
import { GenericService, PurchasingService } from '../../services';
import { TranslateService, LangChangeEvent} from '@ngx-translate/core';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-receiveOrder-list',
  templateUrl: '../../pages/stocks/receiveOrderList.html',
  providers: [GenericService, PurchasingService]
})
export class ReceiveOrderList implements OnInit, OnDestroy {
  
  receiveOrders: ReceiveOrder[] = [];
  cols: any[]; 
  
  constructor
    (
    private genericService: GenericService,
    private purchasingService: PurchasingService,
    private translate: TranslateService,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    ) {

    
  }

  ngOnInit(): void {
    this.cols = [
            { field: 'deliveryDate', header: 'Delivery Date', headerKey: 'COMMON.DELIVERY_DATE', type:'date' },
            { field: 'deliveryNote', header: 'Delivery Note', headerKey: 'COMMON.NOTES' },
            { field: 'purchaseOrderId', header: 'PO ID', headerKey: 'COMMON.PURCHASE_ORDER_ID' },
            { field: 'purchaseOrderDate', header: 'Order Date', headerKey: 'COMMON.ORDER_DATE' },
            { field: 'status', header: 'Status', headerKey: 'COMMON.STATUS', type:'string' }
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
    
    this.updateCols();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.updateCols();
    });
  }
 
  
  updateCols() {
    for (var index in this.cols) {
      let col = this.cols[index];
      this.translate.get(col.headerKey).subscribe((res: string) => {
        col.header = res;
      });
    }
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
