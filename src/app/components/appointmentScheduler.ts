import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Appointment, Department, Employee, Patient, Schedule, User, SearchCriteria } from '../models';
import { Constants } from '../app.constants';
import { EditorModule } from 'primeng/editor';
import { DoctorDropdown, DepartmentDropdown, HospitalLocationDropdown } from './dropdowns';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Message } from 'primeng/api';
import { DialogModule, InputTextareaModule, CheckboxModule, MultiSelectModule, CalendarModule } from 'primeng/primeng';
import { GenericService, AppointmentService } from '../services';

@Component({
  selector: 'app-appointment-scheduler',
  templateUrl: '../pages/appointmentScheduler.html',
  providers: [GenericService, AppointmentService, DoctorDropdown, DepartmentDropdown, HospitalLocationDropdown]
})
export class AppointmentScheduler implements OnInit, OnDestroy {
  
  events: any[];
  headerConfig: any;
  displayEdit: boolean = false;
  appointment: Appointment;
  searchCriteria: SearchCriteria = new SearchCriteria();
  
  messages: Message[] = [];
  
  constructor
    (
      private genericService: GenericService,
      private appointmentService: AppointmentService,
      private doctorDropdown: DoctorDropdown,
      private departmentDropdown: DepartmentDropdown,
      private hospitalLocationDropdown: HospitalLocationDropdown,
      private route: ActivatedRoute,
      private router: Router
    ) {
    }

  ngOnInit(): void {

     this.headerConfig = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };
    
      this.appointment = new Appointment();
      this.appointment.department = new Department();
      this.appointment.doctor = new Employee();
      this.appointment.patient = new Patient();
    
    this.route
        .queryParams
        .subscribe(params => {
        
        if (params['patientId'] != null) {
          this.appointment.patient.id = params['patientId'];
          this.appointment.patient.medicalRecordNumber = params['mrn'];
          this.appointment.patient.name = params['patientName'];
          this.appointment.patient.user.birthDate = params['birthDate'];
          this.appointment.patient.user.sex = params['gender'];
        }
        
        
          
     });
    
  }
  
  ngOnDestroy() {
    
  }

  save() {
    this.messages = [];
    if (this.appointment.patient.id == undefined) {
      this.messages.push({severity:Constants.ERROR, summary:Constants.SAVE_LABEL, detail:'Please Select a patient'});
      return;
    }
    if (this.appointment.hospitalLocation.id == undefined) {
      this.messages.push({severity:Constants.ERROR, summary:Constants.SAVE_LABEL, detail:'Please Select a location'});
      return;
    }
    try {
      this.genericService.save(this.appointment, "Appointment")
        .subscribe(result => {
          if (result.id > 0) {
            this.appointment = result;
            this.messages.push({severity:Constants.SUCCESS, summary:Constants.SAVE_LABEL, detail:Constants.SAVE_SUCCESSFUL});
            this.displayEdit = false;
            this.getAppointments();
          }
          else {
            this.messages.push({severity:Constants.ERROR, summary:Constants.SAVE_LABEL, detail:Constants.SAVE_UNSUCCESSFUL});
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }
  
  addEventClick(e) {
    
      if (this.appointment.doctor.id == null || this.appointment.department.id == null) {
        alert('Please Select a Department and a Doctor to add an appointment.')
        return;
      }
      this.displayEdit = true;
      this.appointment.appointmentDate = e.date.format();    
   }
  
  editEventClick(e) {
      this.displayEdit = true;
      this.appointment.problem = '';
      this.appointment.appointmentDate = e.calEvent.start._i.split("T")[0];    
      this.appointment.beginTime = e.calEvent.start._i.split("T")[1];
      this.appointment.endTime = e.calEvent.end._i.split("T")[1];
    
     let eventId = e.calEvent.id;
     if (eventId != null && eventId > 0) {
              this.genericService.getOne(eventId, 'Appointment')
                  .subscribe(result => {
                if (result.id > 0) {
                  this.appointment = result
                  this.displayEdit = true;
                }
                else {
                }
              })
          }
      
   }
  
  getAppointments() {
    this.events = [];
    if (this.appointment.doctor.id != null 
      || this.appointment.department.id != null 
      || this.appointment.hospitalLocation.id != null) {
      this.searchCriteria.department = this.appointment.department;
      this.searchCriteria.hospitalLocation = this.appointment.hospitalLocation;
      this.searchCriteria.doctor = this.appointment.doctor;
      this.appointmentService.getScheduleAndAppointments(this.searchCriteria)
          .subscribe(result => {
        if (result.length > 0) {
          this.events = result
        }
      })
    }
  }
  
  lookUpPatient(event) {
    this.appointment.patient = event;
    
  }
  
 }
