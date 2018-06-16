import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../app.constants';
import { Bill } from '../models/bill';
import { Invoice } from '../models/invoice';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService } from '../services';

@Component({
  selector: 'app-bill-list',
  templateUrl: '../pages/billList.html',
  providers: [GenericService]
})
export class BillList implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  bills: Bill[] = [];
  cols: any[];
  
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;  
  
  constructor
    (
    private genericService: GenericService,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    ) {

    
  }

  ngOnInit(): void {
    this.cols = [
            { field: 'billDate', header: 'Date', type:'date' },
            { field: 'patientId', header: 'Patient ID' },
            { field: 'patientName', header: 'Patient Name' },
            { field: 'subTotal', header: 'Sub Total' },
            { field: 'taxes', header: 'Taxes' },
            { field: 'discount', header: 'Discount' },
            { field: 'grandTotal', header: 'Grand Total' },
            { field: 'paid', header: 'Paid' },
            { field: 'due', header: 'Due' },
            { field: 'status', header: 'Status', type:'string' }
        ];
    
    this.route
        .queryParams
        .subscribe(params => {          
          
            let parameters: string [] = []; 
            
            parameters.push('e.status = |status|0|Integer')
            
            this.genericService.getAllByCriteria('Bill', parameters)
              .subscribe((data: Bill[]) => 
              { 
                this.bills = data 
              },
              error => console.log(error),
              () => console.log('Get all Bills complete'));
          });
  }
 
  
  ngOnDestroy() {
    this.bills = null;
  }
  
  edit(billId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "billId": billId,
        }
      }
      this.router.navigate(["/admin/billDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

  delete(billId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "billId": billId,
        }
      }
      this.router.navigate(["/admin/billDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

 }
