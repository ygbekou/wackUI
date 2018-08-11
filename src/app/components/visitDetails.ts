import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '../app.constants';
import { Country } from '../models/country';
import { GivenVaccine } from '../models/givenVaccine';
import { Patient } from '../models/patient';
import { Visit } from '../models/visit';
import { Reference } from '../models/reference';
import { EditorModule } from 'primeng/editor';
import {  } from './dropdowns';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule, MultiSelectModule, CalendarModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService, GlobalEventsManager, VisitService } from '../services';
import { AdmissionDiagnoses } from './admissionDiagnoses';
import { DoctorOrderDetails } from './doctorOrderDetails';
import { PrescriptionDetails } from './prescriptionDetails';
import { PrescriptionList } from './prescriptionList';
 
@Component({
  selector: 'app-visit-details',
  templateUrl: '../pages/visitDetails.html',
  providers: [GenericService, VisitService]
})
export class VisitDetails implements OnInit, OnDestroy {
  
  
  public error: String = '';
  displayDialog: boolean;
  visit: Visit = new Visit();
  medicineCols: any[];
  diagnosisCols: any[];
  patient: Patient = new Patient();
  
  activeTab: number = 0;
  
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;  
  DEPARTMENT: string = Constants.DEPARTMENT;
  COUNTRY: string = Constants.COUNTRY;
  ROLE: string = Constants.ROLE;
  SELECT_OPTION: string = Constants.SELECT_OPTION;
  
  vaccineGroups: Reference[] = [];
  
  @ViewChild(DoctorOrderDetails) doctorOrderDetails: DoctorOrderDetails;
  @ViewChild(AdmissionDiagnoses) admissionDiagnoses: AdmissionDiagnoses;
  @ViewChild(PrescriptionDetails) prescriptionDetails: PrescriptionDetails;
  @ViewChild(PrescriptionList) prescriptionList: PrescriptionList;
  
  constructor
    (
      private genericService: GenericService,
      private visitService: VisitService,
      private globalEventsManager: GlobalEventsManager,
      private changeDetectorRef: ChangeDetectorRef,
      private route: ActivatedRoute,
      private router: Router
    ) {
  }

  
  ngOnInit(): void {
    
    let visitId = null;
    this.route
        .queryParams
        .subscribe(params => {          
          
          this.visit.patient = new Patient();
          this.visit.patient.user = new User();
          let gv =  new GivenVaccine();
          this.visit.givenVaccines.push(gv);
          
          visitId = params['visitId'];
          if (visitId != null) {
              this.visitService.getVisit(+visitId)
              .subscribe((data: Visit) => 
              { 
                if (data.id > 0) {
                  this.visit = data;
                  this.patient = this.visit.patient;
                  this.visit.visitDatetime = new Date(this.visit.visitDatetime)
                } 
              },
              error => console.log(error),
              () => console.log('Get Patient visit complete'));
          } else {
              
          }
     });
    
  }
  
  ngOnDestroy() {
    this.visit = null;
  }
  
  updateAllergy(event) {
    console.info(event)
    if (-1 !== this.visit.selectedAllergies.indexOf(event.source.name)) {
      if (event.checked) {
        this.visit.selectedAllergies.push(event.source.name);
      } else {
        this.visit.selectedAllergies.splice(this.visit.selectedAllergies.indexOf(event.source.name), 1);
      }
    }
  }

  save() {
    
    this.visit.patient = this.patient;
    try {
      this.error = '';
      this.visit.patient = this.patient;
      this.visitService.saveVisit(this.visit)
        .subscribe(result => {
          alert(result.id)
          if (result.id > 0) {
            this.visit = result
            console.info(this.visit);
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
            
    parameters.push('e.matricule = |matricule|' + this.patient.matricule + '|String')
    let patientMatricule = this.patient.matricule;
    this.patient = new Patient()
    this.patient.matricule = patientMatricule;
    
    this.genericService.getAllByCriteria('Patient', parameters)
      .subscribe((data: Patient[]) => 
      { 
        if (data.length > 0) {
          console.info(this.patient)
          this.patient = data[0];
        }
      },
      error => console.log(error),
      () => console.log('Get Patient complete'));
  }
  
  onTabChange(evt) {
    this.activeTab = evt.index;
    if (evt.index == 1) {
     
    } 
    else if (evt.index == 2) {
      this.admissionDiagnoses.getDiagnoses();
    } 
    else if (evt.index == 3) {
      this.prescriptionDetails.visit = this.visit;
      this.prescriptionList.visit = this.visit;
      this.prescriptionList.getPrescriptions();
    }
  }
  
  onDoctorOrderSelected($event) {
    let doctorOrderId = $event;
    this.doctorOrderDetails.getDoctorOrder(doctorOrderId);
  }
  
   onPrescriptionSelected($event) {
    let prescriptionId = $event;
    this.prescriptionDetails.getPrescription(prescriptionId);
  }
  
  
 }
