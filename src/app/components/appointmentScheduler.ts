import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Department } from '../models/department';
import { Constants } from '../app.constants';
import { Appointment } from '../models/appointment';
import { Schedule } from '../models/schedule';
import { Employee } from '../models/employee';
import { Patient } from '../models/patient';
import { EditorModule } from 'primeng/editor';
import { DoctorDropdown, DepartmentDropdown } from './dropdowns';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DialogModule, InputTextareaModule, CheckboxModule, MultiSelectModule, CalendarModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService, AppointmentService } from '../services';

@Component({
  selector: 'app-appointment-scheduler',
  templateUrl: '../pages/appointmentScheduler.html',
  providers: [GenericService, AppointmentService, DoctorDropdown, DepartmentDropdown]
})
export class AppointmentScheduler implements OnInit, OnDestroy {
  
  events: any[];
  headerConfig: any;
  
  public error: String = '';
  
  doctorDropdown: DoctorDropdown;
  departmentDropdown: DepartmentDropdown;
  displayEdit: boolean = false;
  appointment: Appointment;
  
  
  constructor
    (
      private genericService: GenericService,
      private appointmentService: AppointmentService,
      private docDropdown: DoctorDropdown,
      private dptDropdown: DepartmentDropdown,
      private changeDetectorRef: ChangeDetectorRef,
      private route: ActivatedRoute,
      private router: Router
    ) {
        this.doctorDropdown = docDropdown;
        this.departmentDropdown = dptDropdown;
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
    
  }
  
  ngOnDestroy() {
    
  }

  save() {
    try {
      this.error = '';
      this.genericService.save(this.appointment, "Appointment")
        .subscribe(result => {
          if (result.id > 0) {
            this.appointment = result
          }
          else {
            this.error = Constants.SAVE_UNSUCCESSFUL;
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
     console.info(e)
    this.appointment.patient = new Patient();
     this.displayEdit = true;
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
                  this.error = Constants.SAVE_UNSUCCESSFUL;
                }
              })
          }
      
   }
  
  getAppointments() {
    this.events = [];
    if (this.appointment.doctor.id != null || this.appointment.department.id != null) {
      let departmentId = this.appointment.department.id == null ? 0 : this.appointment.department.id;
      let doctorId = this.appointment.doctor.id == null ? 0 : this.appointment.doctor.id;
      this.appointmentService.getAppointments(departmentId , doctorId)
          .subscribe(result => {
        if (result.length > 0) {
          this.events = result
        }
        else {
          this.error = Constants.SAVE_UNSUCCESSFUL;
        }
      })
    }
  }
  
  
 }
