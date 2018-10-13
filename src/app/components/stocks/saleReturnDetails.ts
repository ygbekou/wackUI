import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '../../app.constants';
import { Product, Supplier, User } from '../../models';
import { PatientSale } from '../../models/stocks/patientSale';
import { PurchaseOrder, PurchaseOrderProduct } from '../../models/stocks/purchaseOrder';
import { ReceiveOrder } from '../../models/stocks/receiveOrder';
import { SaleReturn } from '../../models/stocks/saleReturn';
import { EditorModule } from 'primeng/editor';
import { EmployeeDropdown, SupplierDropdown, ProductDropdown } from '../dropdowns';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { InputTextareaModule, CheckboxModule, MultiSelectModule, CalendarModule } from 'primeng/primeng';
import { GenericService, PurchasingService } from '../../services';
import { Message } from 'primeng/api';
 
@Component({  
  selector: 'app-saleReturn-details',
  templateUrl: '../../pages/stocks/saleReturnDetails.html',
  providers: [GenericService, PurchasingService, EmployeeDropdown, SupplierDropdown, ProductDropdown]
})
export class SaleReturnDetails implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  saleReturn: SaleReturn = new SaleReturn();
  returnProductCols: any[];
  
  patientSale: PatientSale = new PatientSale();
  
  constructor
    (
      private genericService: GenericService,
      private purchasingService: PurchasingService,
      private productDropdown: ProductDropdown,
      private employeeDropdown: EmployeeDropdown,
      private changeDetectorRef: ChangeDetectorRef,
      private route: ActivatedRoute,
      private router: Router
    ) {
  }

  ngOnInit(): void {

     this.returnProductCols = [
            { field: 'productName', header: 'Name' },
            { field: 'productDescription', header: 'Description' },
            { field: 'originalQuantity', header: 'Sale Quantity', type: 'amount'},
            { field: 'quantity', header: 'Returned Quantity', type: 'number'},
            { field: 'notes', header: 'Notes', type: "text"}
        ]; 
    
    let saleReturnId = null;
    this.route
        .queryParams
        .subscribe(params => {          
          
          saleReturnId = params['saleReturnId'];
          
          if (saleReturnId != null) {
              this.genericService.getNewObject('/service/purchasing/saleReturn/', saleReturnId)
                  .subscribe(result => {
                if (result.id > 0) {
                  this.saleReturn = result
                }
                else {
                  this.error = Constants.SAVE_UNSUCCESSFUL;
                  this.displayDialog = true;
                }
              })
          } else {
              
          }
     });
    
    console.info(this.saleReturn)
  }
  
  ngOnDestroy() {
    this.saleReturn = null;
  }
 
  
  private getNumber(value: number): number {
    return value != undefined ? value : 0;
  } 
  
  save(status: number) {
    this.saleReturn.status = status;
    
    try {
      this.error = '';
      this.genericService.saveWithUrl('/service/purchasing/receiveOrder/save', this.saleReturn)
        .subscribe(result => {
          if (result.id > 0) {
            this.saleReturn = result
            console.info(this.saleReturn);
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
  
  lookUpPatientSale(event) {
    this.patientSale = event;
    
    this.genericService.getNewObject('/service/purchasing/patientSale/newSaleReturn/', this.patientSale.id)
      .subscribe((data: SaleReturn) => 
      { 

        this.saleReturn = data;
        
      },
      error => console.log(error),
      () => console.log('Get saleReturn complete'));
  }

 }
