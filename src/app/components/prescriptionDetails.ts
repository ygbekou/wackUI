import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '../app.constants';
import { Admission } from '../models/admission';
import { Appointment } from '../models/appointment';
import { CaseStudy } from '../models/caseStudy';
import { Medicine } from '../models/medicine';
import { Patient } from '../models/patient';
import { Prescription } from '../models/prescription';
import { Diagnosis } from '../models/diagnosis';
import { PrescriptionDiagnosis } from '../models/prescriptionDiagnosis';
import { PrescriptionMedicine } from '../models/prescriptionMedicine';
import { EditorModule } from 'primeng/editor';
import { DoctorDropdown, MedicineDropdown } from './dropdowns';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule, MultiSelectModule, CalendarModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService, AdmissionService, GlobalEventsManager } from '../services';

@Component({
  selector: 'app-prescription-details',
  templateUrl: '../pages/prescriptionDetails.html',
  providers: [GenericService, AdmissionService, MedicineDropdown]
})
export class PrescriptionDetails implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  prescription: Prescription = new Prescription();
  medicineCols: any[];
  diagnosisCols: any[];
  
  medicineDropdown: MedicineDropdown;
  
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;  
  DEPARTMENT: string = Constants.DEPARTMENT;
  COUNTRY: string = Constants.COUNTRY;
  ROLE: string = Constants.ROLE;
  SELECT_OPTION: string = Constants.SELECT_OPTION;
  
  constructor
    (
      private globalEventsManager: GlobalEventsManager,
      private genericService: GenericService,
      private admissionService: AdmissionService,
      private mdDropdown: MedicineDropdown,
      private changeDetectorRef: ChangeDetectorRef,
      private route: ActivatedRoute,
      private router: Router
    ) {
    this.medicineDropdown = mdDropdown;
    
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
            { field: 'diagnosis', header: 'Diagnosis' },
            { field: 'instructions', header: 'Instructions' }
        ];
    
    let prescriptionId = null;
    this.route
        .queryParams
        .subscribe(params => {          
          
          this.prescription.admission = new Admission();
          let pm =  new PrescriptionMedicine();
          pm.medicine = new Medicine();
          this.prescription.prescriptionMedicines.push(pm);
          let pd =  new PrescriptionDiagnosis();
          this.prescription.prescriptionDiagnoses.push(pd);
          
          prescriptionId = params['prescriptionId'];
          
          if (prescriptionId != null) {
              this.genericService.getOne(prescriptionId, 'Prescription')
                  .subscribe(result => {
                if (result.id > 0) {
                  this.prescription = result
                }
                else {
                  this.error = Constants.saveFailed;
                  this.displayDialog = true;
                }
              })
          } else {
              
          }
     });
    
  }
  
  ngOnDestroy() {
    this.prescription = null;
  }

  save() {
    
    try {
      this.error = '';
      this.prescription.admission = new Admission();
      this.prescription.admission.id = this.globalEventsManager.selectedAdmissionId;
      this.admissionService.savePrescription(this.prescription)
        .subscribe(result => {
          alert(result.id)
          if (result.id > 0) {
            this.prescription = result
            console.info(this.prescription);
          }
          else {
            this.error = Constants.saveFailed;
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }
  
  
  getPrescription(prescriptionId: number) {
    this.admissionService.getPrescription(prescriptionId)
        .subscribe(result => {
      if (result.id > 0) {
        this.prescription = result
        this.prescription.prescriptionDatetime = new Date(this.prescription.prescriptionDatetime);
      }
      else {
        this.error = Constants.saveFailed;
        this.displayDialog = true;
      }
    })
  }
  
}
