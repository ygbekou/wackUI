import { Constants } from '../../app.constants';
import { User } from '../../models';
import { PatientSale } from '../../models/stocks/patientSale';
import { PurchaseOrder } from '../../models/stocks/purchaseOrder';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { GenericService, AppointmentService } from '../../services';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-patient_sale-lookup',
  template: `<div class="ui-grid ui-grid-responsive ui-fluid">
              <div class="ui-grid-row">
                <div class="ui-grid-col-5 ui-sm-12">  
                  <div class="ui-grid-row">
                     <div class="form-group"> 
                        <label i18n="@@patientSaleId" for="patientSaleId">Patient Sale ID</label>
                        <form (ngSubmit)="search()" #searchForm="ngForm">
                          <input type="text" pInputText class="form-control" id="searchT"
                            required [(ngModel)]="schText" (change)="lookUpPatientSale($event)"
                            placeholder="{{SEARCH_TEXT}}" name="searchT"
                            #searchT="ngModel">
                        </form>
                     </div>
                     <div>
                        <br/>
                        <button type="button" pButton icon="fa fa-search" (click)="openPatientSaleSearchPage()"></button>    
                     </div>
                  </div>
                </div>
                <div class="ui-grid-col-6 ui-sm-12">
                  <div class="ui-grid-row">
                    <div class="ui-grid-col-4 ui-sm-12">
                      Patient Sale ID:
                    </div>
                    <div class="ui-grid-col-4 ui-sm-12">
                      {{patientSale.id}}
                    </div>
                    <div class="ui-grid-col-4 ui-sm-12">
                      Patient:
                    </div>
                    <div class="ui-grid-col-4 ui-sm-12" *ngIf="patientSale.admission">
                      {{patientSale.admission.patient.name}}
                    </div>   
                    <div class="ui-grid-col-4 ui-sm-12" *ngIf="patientSale.visit">
                      {{patientSale.visit.patient.name}}
                    </div>     
                  </div>
                  <div class="ui-grid-row">
                    <div class="ui-grid-col-4 ui-sm-12">
                      Patient DOB:
                    </div>
                    <div class="ui-grid-col-4 ui-sm-12" *ngIf="patientSale.admission">
                      {{patientSale.admission.patient.birthDate | date:'dd/MM/yyyy'}}
                    </div>
                    <div class="ui-grid-col-4 ui-sm-12" *ngIf="patientSale.visit">
                      {{patientSale.visit.patient.birthDate | date:'dd/MM/yyyy'}}
                    </div>
                  </div>
                  <div class="ui-grid-row">
                    <div class="ui-grid-col-4 ui-sm-12">
                      Sale Date:
                    </div>
                    <div class="ui-grid-col-4 ui-sm-12">
                      {{patientSale.saleDatetime | date:'dd/MM/yyyy hh:mm'}}
                    </div>
                  </div>      
                </div>
              </div>
             </div>`
})
  
  
export class PatientSaleLookup implements OnInit {
   
  @Input() patientSale: PatientSale = new PatientSale();
  @Output() patientSaleEmit: EventEmitter<PatientSale> = new EventEmitter<PatientSale>();
  @Input() schText: string;
  @Input() originalPage: string;
  
  SEARCH_TEXT: string = "SALE ID";
  
  constructor(
        private genericService: GenericService,
        private router: Router
    ) {

  }
  
  ngOnInit() {
  
  }
  
  openPatientSaleSearchPage() {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "originalPage": this.originalPage,    
        }
      }
      this.router.navigate(["/admin/patientSaleList"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

  lookUpPatientSale() {
    let parameters: string [] = []; 
    let patientSale = null;
            
    parameters.push('e.id = |patientSaleId|' + this.schText + '|Long')
    
    this.genericService.getAllByCriteria('PatientSale', parameters)
      .subscribe((data: PatientSale[]) => 
      { 
        if (data.length > 0) {
          this.patientSale = data[0];
        } else {
          this.patientSale = new PatientSale();
        }
        this.patientSaleEmit.emit(this.patientSale);
      },
      error => console.log(error),
      () => console.log('Get Patient Sale complete'));
  }
}
