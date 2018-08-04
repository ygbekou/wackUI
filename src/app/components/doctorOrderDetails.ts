import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Constants } from '../app.constants';
import { Appointment } from '../models/appointment';
import { DoctorOrder } from '../models/doctorOrder';
import { VitalSign } from '../models/vitalSign';
import { Patient } from '../models/patient';
import { EditorModule } from 'primeng/editor';
import { AppointmentDropdown, DoctorOrderTypeDropdown, DoctorOrderPriorityDropdown, DoctorOrderKindDropdown, DoctorDropdown } from './dropdowns';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule, MultiSelectModule, CalendarModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService } from '../services';

@Component({ 
  selector: 'app-doctorOrder-details',
  templateUrl: '../pages/doctorOrderDetails.html', 
  providers: [GenericService, AppointmentDropdown, DoctorDropdown, DoctorOrderTypeDropdown, DoctorOrderPriorityDropdown, DoctorOrderKindDropdown]
})
export class DoctorOrderDetails implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  doctorOrder: DoctorOrder = new DoctorOrder();
 
  appointmentDropdown: AppointmentDropdown;
  doctorOrderTypeDropdown: DoctorOrderTypeDropdown;
  doctorOrderPriorityDropdown: DoctorOrderPriorityDropdown;
  doctorOrderKindDropdown: DoctorOrderKindDropdown;
  doctorDropdown: DoctorDropdown;
  
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;  
  SELECT_OPTION: string = Constants.SELECT_OPTION;
  
  patient: Patient = new Patient();
  user: User;
  
  
  constructor
    (
      private genericService: GenericService,
      private aptDropdown: AppointmentDropdown,
      private dotDropdown: DoctorOrderTypeDropdown,
      private dopDropdown: DoctorOrderPriorityDropdown,
      private dokDropdown: DoctorOrderKindDropdown,
      private docDropdown: DoctorDropdown,
      private changeDetectorRef: ChangeDetectorRef,
      private route: ActivatedRoute,
      private router: Router
    ) {
    this.appointmentDropdown = aptDropdown;
    this.doctorOrderTypeDropdown = dotDropdown;
    this.doctorOrderPriorityDropdown = dopDropdown;
    this.doctorOrderKindDropdown = dokDropdown;
    this.doctorDropdown = docDropdown;
    this.patient.user = new User();
  }

  ngOnInit(): void {
    if (this.user == null) {
      if (Cookie.get('user'))
        this.user = JSON.parse(Cookie.get('user'));
      if (this.user == null) {
        this.user = new User();
        this.user.id = 0;
      }
    }
    
    
    let doctorOrderId = null;
    this.route
        .queryParams
        .subscribe(params => {          
          
          this.doctorOrder.appointment = new Appointment();         
          doctorOrderId = params['doctorOrderId'];
          
          if (doctorOrderId != null) {
              this.genericService.getOne(doctorOrderId, "DoctorOrder")
                  .subscribe(result => {
                if (result.id > 0) {
                  
                  this.doctorOrder = result
                  this.doctorOrder.doctorOrderDatetime = new Date(this.doctorOrder.doctorOrderDatetime);
                  if (this.doctorOrder.receivedDatetime != null)
                    this.doctorOrder.receivedDatetime = new Date(this.doctorOrder.receivedDatetime);
                  this.patient = this.doctorOrder.appointment.patient;
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
    this.doctorOrder = null;
  }
  
  save() {
    
    try {
      this.error = '';
      
      if (this.user.userGroup.id != 2 && 
        (this.doctorOrder.doctor == null || this.doctorOrder.doctorOrderPriority == null 
            || this.doctorOrder.receivedDatetime == null)) {
        alert('The Ordering Doctor and the Priority and Received Date is required.')
        return;
      }
      
      this.genericService.save(this.doctorOrder, "DoctorOrder")
        .subscribe(result => {
          alert(result.id)
          if (result.id > 0) {
            this.doctorOrder = result
            console.info(this.doctorOrder);
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
          this.patient = data[0];
          this.appointmentDropdown.patientId = this.patient.id;
          this.appointmentDropdown.getAllAppointments();
        }
      },
      error => console.log(error),
      () => console.log('Get Patient complete'));
  }

 }
