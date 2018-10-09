import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '../app.constants';
import { Admission } from '../models/admission';
import { AdmissionDiagnosis } from '../models/admissionDiagnosis';
import { Discharge } from '../models/discharge';
import { PrescriptionMedicine } from '../models/prescription';
import { Reference } from '../models/reference';
import { EditorModule } from 'primeng/editor';
import { DoctorDropdown } from './dropdowns';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule, MultiSelectModule, CalendarModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { Visit } from '../models/visit';
import { GenericService, AdmissionService, GlobalEventsManager, VisitService } from '../services';

@Component({
  selector: 'app-discharge-details',
  templateUrl: '../pages/dischargeDetails.html',
  providers: [GenericService, AdmissionService, DoctorDropdown]
})
export class DischargeDetails implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  discharge: Discharge = new Discharge();
  medicineCols: any[];
  diagnosisCols: any[];
  
  dischargeReasons: Reference[] = [];
  prescriptionMedicines: PrescriptionMedicine[] = [];
  diagnoses: AdmissionDiagnosis[] = [];
  
  doctorDropdown: DoctorDropdown;
  
  @Input() admission: Admission;
  @Input() visit: Visit;
  
  constructor
    (
      private globalEventsManager: GlobalEventsManager,
      private genericService: GenericService,
      private admissionService: AdmissionService,
      private visitService: VisitService,
      private dctDropdown: DoctorDropdown,
      private changeDetectorRef: ChangeDetectorRef,
      private route: ActivatedRoute,
      private router: Router
    ) {
    this.doctorDropdown = this.dctDropdown;
  }

  ngOnInit(): void {

     this.medicineCols = [
            { field: 'medicine', header: 'Name' },
            { field: 'type', header: 'Type' },
            { field: 'dosage', header: 'Dosage' },
            { field: 'quantity', header: 'Quantity' },
            { field: 'frequency', header: 'Frequency' },
            { field: 'numberOfDays', header: 'Number Of Days' }
        ];
    this.diagnosisCols = [
            { field: 'name', parent:'diagnosis', header: 'Name' },
            { field: 'description', parent:'diagnosis', header: 'Description' },
            { field: 'instructions', header: 'Instructions' }
        ];
    
    this.genericService.getActiveElements('dischargereason')
      .subscribe((data: Reference[]) => 
      { 
        if (data.length > 0) {
          this.dischargeReasons = data;
        }
      },
      error => console.log(error),
      () => console.log('Get ative discharge reasons complete'));
    
    let parameters: string [] = []; 
    parameters.push('e.prescription.visit.id = |visitId|' + this.visit.id + '|Long')
    parameters.push('e.prescription.isDischarge = |isDischarge|Y|String')
    parameters.push('e.prescription.status = |status|0|Integer')
    
    this.genericService.getAllByCriteria('PrescriptionMedicine', parameters)
      .subscribe((data: PrescriptionMedicine[]) => 
      { 
        this.prescriptionMedicines = data 
      },
      error => console.log(error),
      () => console.log('Get all Prescription Medicines complete'));
    
    // Get diagnoses
    let parentEntity = '';
    parameters = [];
    if (this.visit && this.visit.id > 0) {
      parameters.push('e.visit.id = |visitId|' + this.visit.id + '|Long')
      parentEntity = 'VisitDiagnosis';
    }
    
    this.genericService.getAllByCriteria(parentEntity, parameters)
      .subscribe((data: AdmissionDiagnosis[]) => 
      { 
        this.diagnoses = data 
      },
      error => console.log(error),
      () => console.log('Get all diagnoses complete'));
    
    
    this.genericService.getAllByCriteria('Discharge', parameters)
      .subscribe((data: Discharge[]) => 
      { 
        if (data && data.length > 0) {
          this.discharge = data[0] 
        }
      },
      error => console.log(error),
      () => console.log('Get all diagnoses complete'));
  }
  
  ngOnDestroy() {
    this.discharge = null;
  }

  save() {
    
    try {
      this.error = '';
      if (this.visit && this.visit.id > 0) {
        this.discharge.visit = this.visit;
      }
      if (this.admission && this.admission.id > 0) {
        this.discharge.admission = this.admission;
      }
      
      let dischargeReasonId = this.discharge.dischargeReason;
      alert(dischargeReasonId.id)
      
      this.genericService.save(this.discharge, 'Discharge')
        .subscribe(result => {
          if (result.id > 0) {
            this.discharge = result
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
  
}
