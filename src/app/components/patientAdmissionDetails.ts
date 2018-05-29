import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '../app.constants';
import { Package } from '../models/package';
import { Patient } from '../models/patient';
import { PatientAdmission } from '../models/patientAdmission';
import { EditorModule } from 'primeng/editor';
import { DoctorDropdown, PackageDropdown, InsuranceDropdown } from './dropdowns';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule, MultiSelectModule, CalendarModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService, AppointmentService } from '../services';

@Component({
  selector: 'app-patientAdmission-details',
  templateUrl: '../pages/patientAdmissionDetails.html',
  providers: [GenericService, AppointmentService, DoctorDropdown, PackageDropdown, InsuranceDropdown]
})
export class PatientAdmissionDetails implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  patientAdmission: PatientAdmission = new PatientAdmission();
  medicineCols: any[];
  diagnosisCols: any[];
  
  doctorDropdown: DoctorDropdown;
  packageDropdown: PackageDropdown;
  insuranceDropdown: InsuranceDropdown;
  
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
      private dcDropdown: DoctorDropdown,
      private pkgeDropdown: PackageDropdown,
      private insceDropdown: InsuranceDropdown,
      private changeDetectorRef: ChangeDetectorRef,
      private route: ActivatedRoute,
      private router: Router
    ) {
    this.doctorDropdown = dcDropdown;
    this.packageDropdown = pkgeDropdown;
    this.insuranceDropdown = insceDropdown;
    
  }

  ngOnInit(): void {
    
    let patientAdmissionId = null;
    this.route
        .queryParams
        .subscribe(params => {          
          
          this.patientAdmission.patient = new Patient();
          this.patientAdmission.patient.user = new User();
          this.patientAdmission.pckage = new Package();
          
          patientAdmissionId = params['patientAdmissionId'];
          
          if (patientAdmissionId != null) {
              this.genericService.getOne(patientAdmissionId, 'PatientAdmission')
                  .subscribe(result => {
                if (result.id > 0) {
                  this.patientAdmission = result
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
    this.patientAdmission = null;
  }

  save() {
    
    try {
      this.error = '';
      this.genericService.save(this.patientAdmission, 'PatientAdmission')
        .subscribe(result => {
          alert(result.id)
          if (result.id > 0) {
            this.patientAdmission = result
            console.info(this.patientAdmission);
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
            
    parameters.push('e.matricule = |matricule|' + this.patientAdmission.patient.matricule + '|String')
    
    this.genericService.getAllByCriteria('Patient', parameters)
      .subscribe((data: Patient[]) => 
      { 
        if (data.length > 0) {
          this.patientAdmission.patient = data[0];
        }
      },
      error => console.log(error),
      () => console.log('Get Patient complete'));
  }

 }
