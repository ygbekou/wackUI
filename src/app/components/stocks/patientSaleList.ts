import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Employee } from '../../models/employee';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../../app.constants';
import { Admission } from '../../models/admission';
import { PatientSale, PatientSaleProduct } from '../../models/stocks/patientSale';
import { FileUploader } from './../fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToolbarModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../../models/user';  
import { Visit } from '../../models/visit';
import { GenericService, PurchasingService, GlobalEventsManager } from '../../services';

@Component({ 
  selector: 'app-patientSale-list',
  templateUrl: '../../pages/stocks/patientSaleList.html',
  providers: [GenericService, PurchasingService, ToolbarModule] 
})
  
export class PatientSaleList implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  patientSales: PatientSale[] = [];
  cols: any[];
  
  @Input() admission: Admission;
  @Input() visit: Visit;
  
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
            { field: 'saleDatetime', header: 'Date time', type:'date' },
            { field: 'notes', header: 'Notes' },
            { field: 'subTotal', header: 'Sub Total' },
            { field: 'taxes', header: 'Taxes' },
            { field: 'discount', header: 'Discount' },
            { field: 'grandTotal', header: 'Grand Total' },
            { field: 'status', header: 'Status', type:'string' }
        ];
    
    this.route
        .queryParams
        .subscribe(params => {          
          
            let parameters: string [] = []; 
            
            let itemNumberLabel = params['itemNumberLabel'];
          
            parameters.push('e.status = |status|0|Integer')
            if (itemNumberLabel == 'Visit') 
              parameters.push('e.visit.id > |visitId|0|Long')
            if (itemNumberLabel == 'Admission') 
              parameters.push('e.admission.id > |admissionId|0|Long')
          
            this.genericService.getAllByCriteria('com.qkcare.model.stocks.PatientSale', parameters)
              .subscribe((data: PatientSale[]) => 
              { 
                this.patientSales = data 
              },
              error => console.log(error),
              () => console.log('Get all PatientSale complete'));
          });
  }
 
  
  ngOnDestroy() {
    this.patientSales = null;
  }
  
  edit(patientSaleId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "patientSaleId": patientSaleId,
        }
      }
      this.router.navigate(["/admin/patientSaleDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

  delete(patientSaleId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "patientSaleId": patientSaleId,
        }
      }
      this.router.navigate(["/admin/patientSaleDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

 }
