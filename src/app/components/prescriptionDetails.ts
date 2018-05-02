import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '../app.constants';
import { Appointment } from '../models/appointment';
import { CaseStudy } from '../models/caseStudy';
import { Medicine } from '../models/medicine';
import { Patient } from '../models/patient';
import { Prescription } from '../models/prescription';
import { PrescriptionDiagnosis } from '../models/prescriptionDiagnosis';
import { PrescriptionMedicine } from '../models/prescriptionMedicine';
import { EditorModule } from 'primeng/editor';
import { DoctorDropdown, MedicineDropdown } from './dropdowns';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule, MultiSelectModule, CalendarModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService, AppointmentService } from '../services';

@Component({
  selector: 'app-prescription-details',
  templateUrl: '../pages/prescriptionDetails.html',
  providers: [GenericService, AppointmentService, MedicineDropdown]
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
      private genericService: GenericService,
      private appointmentService: AppointmentService,
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
            { field: 'instructions', header: 'Instructions' }
        ];
    
     this.diagnosisCols = [
            { field: 'diagnosis', header: 'Diagnosis' },
            { field: 'instructions', header: 'Instructions' }
        ];
    
    let prescriptionId = null;
    this.route
        .queryParams
        .subscribe(params => {          
          
          this.prescription.patient = new Patient();
          this.prescription.patient.user = new User();
          this.prescription.appointment = new Appointment();
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
      this.appointmentService.savePrescription(this.prescription)
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
  
  lookUpPatient() {
    
    let parameters: string [] = []; 
            
    parameters.push('e.matricule = |matricule|' + this.prescription.patient.matricule + '|String')
    
    this.genericService.getAllByCriteria('Patient', parameters)
      .subscribe((data: Patient[]) => 
      { 
        if (data.length > 0) {
          this.prescription.patient = data[0];
        }
      },
      error => console.log(error),
      () => console.log('Get Patient complete'));
  }

 }
