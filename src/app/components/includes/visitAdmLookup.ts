import { Constants } from '../../app.constants';
import { Patient, Visit, Admission } from '../../models';
import { User } from '../../models/user';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { GenericService, AppointmentService } from '../../services';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-visitAdm-lookup',
  template: `<div class="ui-grid ui-grid-responsive ui-fluid">
              <div class="ui-grid-row">
                <div class="ui-grid-col-5 ui-sm-12">  
                  <div class="ui-grid-row">
                     <div class="form-group">
                        <label i18n="@@itemNumber" for="itemNumber">{{itemNumberLabel}}<font color="red">*</font></label>
                        <form (ngSubmit)="search()" #searchForm="ngForm">
                          <input type="text" pInputText class="form-control" id="searchT"
                            required [(ngModel)]="itemNumber" (change)="lookUpItem($event)"
                            placeholder="{{SEARCH_TEXT}}" name="searchT"
                            #searchT="ngModel">
                        </form>
                     </div>
                     <div>
                        <br/>
                        <button type="button" pButton icon="fa fa-search" (click)="openPatientSearchPage()"></button>    
                     </div>
                  </div>
                </div>
                <div class="ui-grid-col-6 ui-sm-12">
                  <div class="ui-grid-row">
                    <div class="ui-grid-col-4 ui-sm-12">
                      Patient ID:
                    </div>
                    <div class="ui-grid-col-4 ui-sm-12">
                      {{visit.patient.medicalRecordNumber}}
                    </div>
                    <div class="ui-grid-col-4 ui-sm-12">
                      Gender:
                    </div>
                    <div class="ui-grid-col-4 ui-sm-12">
                      {{visit.patient.sex}}
                    </div>      
                  </div>
                  <div class="ui-grid-row">
                    <div class="ui-grid-col-4 ui-sm-12">
                      Name:
                    </div>
                    <div class="ui-grid-col-4 ui-sm-12">
                      {{visit.patient.name}}
                    </div>
                  </div>
                  <div class="ui-grid-row">
                    <div class="ui-grid-col-4 ui-sm-12">
                      DOB:
                    </div>
                    <div class="ui-grid-col-4 ui-sm-12">
                      {{visit.patient.user.birthDate | date:'dd/MM/yyyy'}}
                    </div>
                  </div>  
                  <div class="ui-grid-row">
                    <div class="ui-grid-col-6 ui-sm-12">
                      Visit Date: {{visit.visitDatetime | date:'dd/MM/yyyy'}}
                    </div>
                    <div class="ui-grid-col-6 ui-sm-12">
                      Visit ID: {{visit.id}}
                    </div>
                  </div>        
                </div>
              </div>
             </div>`
})
  
  
export class VisitAdmLookup implements OnInit {
   
  @Input() itemNumberLabel: string = 'Visit';
  @Input() visit: Visit = new Visit();
  @Input() admission: Admission = new Admission();
  
  @Output() visitEmit: EventEmitter<Visit> = new EventEmitter<Visit>();
   @Output() admissionEmit: EventEmitter<Admission> = new EventEmitter<Admission>();
  @Input() itemNumber: string;
  @Input() originalPage: string;
  
  SEARCH_TEXT: string = "VISIT_ID";
  
  constructor(
        private genericService: GenericService,
        private router: Router
    ) {

  }
  
  ngOnInit() {
    this.visit = new Visit();
    this.visit.patient = new Patient();
  }
  
  openPatientSearchPage() {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "originalPage": this.originalPage,    
        }
      }
      this.router.navigate(["/admin/visitList"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

  lookUpItem() {
    let parameters: string[] = [];

    if (this.itemNumberLabel == 'Visit') 
      parameters.push('e.visitNumber = |visitNumber|' + this.itemNumber + '|String')
    if (this.itemNumberLabel == 'Admission') 
      parameters.push('e.id = |admissionId|' + this.itemNumber + '|Long')
  
      this.genericService.getAllByCriteria(this.itemNumberLabel, parameters)
        .subscribe((data: any[]) => {
          if (data) {
            if (this.itemNumberLabel == 'Visit')  {
              alert('Here')
              this.visit = data[0];
              this.visitEmit.emit(this.visit);
            } 
            if (this.itemNumberLabel == 'Admission') {
              this.admission = data[0];
               this.admissionEmit.emit(this.admission);
            }
          }
        },
        error => console.log(error),
        () => console.log('Get Item complete'));
  }
}
