import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../../app.constants';
import { ReceiveOrder, ReceiveOrderProduct } from '../../models/stocks/receiveOrder';
import { SaleReturn } from '../../models/stocks/saleReturn';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../../models/user';  
import { GenericService, PurchasingService } from '../../services';

@Component({
  selector: 'app-saleReturn-list',
  templateUrl: '../../pages/stocks/saleReturnList.html',
  providers: [GenericService, PurchasingService]
})
export class SaleReturnList implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  saleReturns: SaleReturn[] = [];
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
            { field: 'returnDatetime', header: 'Return Date', type:'date' },
            { field: 'comments', header: 'Comments' },
            { field: 'patientSaleId', header: 'PS ID' },
            { field: 'saleDatetime', header: 'Sale Date' },
            { field: 'status', header: 'Status', type:'string' }
        ];
    
    this.route
        .queryParams
        .subscribe(params => {          
          
            let parameters: string [] = []; 
            
            parameters.push('e.status = |status|0|Integer')
            
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
