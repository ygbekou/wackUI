import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '../app.constants';
import { Appointment } from '../models/appointment';
import { VitalSign } from '../models/vitalSign';
import { Patient } from '../models/patient';
import { EditorModule } from 'primeng/editor';
import { AppointmentDropdown } from './dropdowns';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule, MultiSelectModule, CalendarModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService } from '../services';

@Component({ 
  selector: 'app-vitalSign-details',
  templateUrl: '../pages/vitalSignDetails.html',
  providers: [GenericService, AppointmentDropdown]
})
export class VitalSignDetails implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  @Input() vitalSign: VitalSign = new VitalSign();
 
  appointmentDropdown: AppointmentDropdown;
  
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;  
  SELECT_OPTION: string = Constants.SELECT_OPTION;
  
  patient: Patient = new Patient();
  
  
  constructor
    (
      private genericService: GenericService,
      private aptDropdown: AppointmentDropdown,
      private changeDetectorRef: ChangeDetectorRef,
      private route: ActivatedRoute,
      private router: Router
    ) {
    this.appointmentDropdown = aptDropdown;
    this.patient.user = new User();
  }

  ngOnInit(): void {
    
    let vitalSignId = null;
    this.route
        .queryParams
        .subscribe(params => {          
          
          this.vitalSign.appointment = new Appointment();         
          vitalSignId = params['vitalSignId'];
          
          if (vitalSignId != null) {
              this.genericService.getOne(vitalSignId, "VitalSign")
                  .subscribe(result => {
                if (result.id > 0) {
                  this.vitalSign = result
                  this.vitalSign.vitalSignDatetime = new Date(this.vitalSign.vitalSignDatetime);
                  this.patient = this.vitalSign.appointment.patient;
                }
                else {
                  this.error = Constants.SAVE_UNSUCCESSFUL;
                  this.displayDialog = true;
                }
              })
          } else {
              
          }
     });
    
  }
  
  ngOnDestroy() {
    this.vitalSign = null;
  }
  
  save() {
    
    try {
      this.error = '';
      this.genericService.save(this.vitalSign, "VitalSign")
        .subscribe(result => {
          alert(result.id)
          if (result.id > 0) {
            this.vitalSign = result;
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
  
  calculateBMI() {
    let weightInKg = this.vitalSign.weight * 0.45;
    let heightInMeter = this.vitalSign.height * 0.025;
    let heightInMeterSquare = heightInMeter * heightInMeter;
    let bmi = weightInKg / heightInMeterSquare;
    this.vitalSign.bmi = Math.round(bmi);
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
          this.patient = data[0];
          this.appointmentDropdown.patientId = this.patient.id;
          this.appointmentDropdown.getAllAppointments();
        }
      },
      error => console.log(error),
      () => console.log('Get Patient complete'));
  }

 }
