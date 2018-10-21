import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../../app.constants';
import { ReceiveOrder, ReceiveOrderProduct } from '../../models/stocks/receiveOrder';
import { SaleReturn } from '../../models/stocks/saleReturn';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../../models/user';  
import { GenericService, PurchasingService } from '../../services';

@Component({
  selector: 'app-saleReturn-list',
  templateUrl: '../../pages/stocks/saleReturnList.html',
  providers: [GenericService, PurchasingService]
})
export class SaleReturnList implements OnInit, OnDestroy {
  
  saleReturns: SaleReturn[] = [];
  cols: any[];
  
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
            { field: 'returnDatetime', header: 'Return Date', type:'date', format: 'dd/MM/yyyy' },
            { field: 'comments', header: 'Comments' },
            { field: 'patientSaleId', header: 'PS ID' },
            { field: 'patientSaleDatetime', header: 'Sale Date', type: 'date', format: 'dd/MM/yyyy hh:mm'},
            { field: 'status', header: 'Status', type:'string' }
        ];
    
    this.route
        .queryParams
        .subscribe(params => {          
          
            let parameters: string [] = []; 
            
            this.genericService.getAllByCriteria('com.qkcare.model.stocks.SaleReturn', parameters)
              .subscribe((data: SaleReturn[]) => 
              { 
                this.saleReturns = data 
              },
              error => console.log(error),
              () => console.log('Get all SaleReturn complete'));
          });
  }
 
  
  ngOnDestroy() {
    this.saleReturns = null;
  }
  
  edit(saleReturnId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "saleReturnId": saleReturnId,
        }
      }
      this.router.navigate(["/admin/saleReturnDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

  delete(saleReturnId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "saleReturnId": saleReturnId,
        }
      }
      this.router.navigate(["/admin/saleReturnrDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

 }
