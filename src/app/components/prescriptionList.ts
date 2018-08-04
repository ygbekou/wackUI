import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Employee } from '../models/employee';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../app.constants';
import { Admission } from '../models/admission';
import { CaseStudy } from '../models/caseStudy';
import { Prescription } from '../models/prescription';
import { Schedule } from '../models/schedule';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService, AdmissionService, GlobalEventsManager } from '../services';

@Component({
  selector: 'app-prescription-list',
  templateUrl: '../pages/prescriptionList.html',
  providers: [GenericService]
})
export class PrescriptionList implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  prescriptions: Prescription[] = [];
  cols: any[];
  
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;  
  
  @Input() admission: Admission;
  @Output() prescriptionIdEvent = new EventEmitter<string>();
  
  constructor
    (
    private globalEventsManager: GlobalEventsManager,
    private genericService: GenericService,
    private admissionService: AdmissionService,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    ) {

    
  }

  ngOnInit(): void {
    this.cols = [
            { field: 'prescriptionDatetime', header: 'Date', type: 'Date' },
            { field: 'prescriptionType', header: 'Type' },
            { field: 'notes', header: 'Notes' },
            { field: 'status', header: 'Status', type:'string' }
        ];
    
    this.route
        .queryParams
        .subscribe(params => {          
          
            let parameters: string [] = []; 
            
            parameters.push('e.status = |status|0|Integer')
            
            this.genericService.getAllByCriteria('Prescription', parameters)
              .subscribe((data: Prescription[]) => 
              { 
                this.prescriptions = data 
              },
              error => console.log(error),
              () => console.log('Get all Prescriptions complete'));
          });
    
    
    this.getPrescriptions();
  }
 
  
  ngOnDestroy() {
    this.prescriptions = null;
  }
  
  edit(prescriptionId: string) {
    this.prescriptionIdEvent.emit(prescriptionId);
  }

  delete(prescriptionId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "prescriptionId": prescriptionId,
        }
      }
      this.router.navigate(["/admin/prescriptionDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

  
   getPrescriptions() {
     
    this.admissionService.getAdmissionPrescriptions(this.globalEventsManager.selectedAdmissionId)
     .subscribe((data: Prescription[]) => 
      { 
        this.prescriptions = data;
      },
      error => console.log(error),
      () => console.log('Get Patient Admission Prescriptions complete'));
  }
 }
