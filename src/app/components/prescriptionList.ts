import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Employee, Visit, User, Admission, Prescription } from '../models';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../app.constants';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { GenericService, AdmissionService, GlobalEventsManager } from '../services';

@Component({
  selector: 'app-prescription-list',
  templateUrl: '../pages/prescriptionList.html',
  providers: [GenericService, AdmissionService]
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
  @Input() visit: Visit;
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
            { field: 'prescriptionTypeName', header: 'Type' },
            { field: 'notes', header: 'Notes' },
            { field: 'isDischargeDesc', header: 'Is Discharge'}
        ];
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
     
      let parameters: string [] = []; 
            
        parameters.push('e.status = |status|0|Integer')
        if (this.visit && this.visit.id > 0)  {
          parameters.push('e.visit.id = |visitId|' + this.visit.id + '|Long')
        } 
        if (this.admission && this.admission.id > 0)  {
          parameters.push('e.admission.id = |admissionId|' + this.admission.id + '|Long')
        } 
        
        
        this.genericService.getAllByCriteria('Prescription', parameters)
          .subscribe((data: Prescription[]) => 
          { 
            this.prescriptions = data 
          },
          error => console.log(error),
          () => console.log('Get all Prescriptions complete'));
      }
 }
