import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Department } from '../models/department';
import { Constants } from '../app.constants';
import { Schedule } from '../models/schedule';
import { Employee } from '../models/employee';
import { UserGroup } from '../models/userGroup';
import { FileUploader } from './fileUploader';
import { EditorModule } from 'primeng/editor';
import { DoctorDropdown, WeekdayDropdown } from './dropdowns';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule, MultiSelectModule, CalendarModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService, UserService } from '../services';

@Component({
  selector: 'app-schedule-details',
  templateUrl: '../pages/scheduleDetails.html',
  providers: [GenericService, DoctorDropdown, WeekdayDropdown]
})
export class ScheduleDetails implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  schedule: Schedule = new Schedule();
  doctorDropdown: DoctorDropdown;
  weekdayDropdown: WeekdayDropdown;
  
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
      private userService: UserService,
      private docDropdown: DoctorDropdown,
      private wkdayDropdown: WeekdayDropdown,
      private changeDetectorRef: ChangeDetectorRef,
      private route: ActivatedRoute,
      private router: Router
    ) {
      this.doctorDropdown = docDropdown;
      this.weekdayDropdown = wkdayDropdown;
  }

  ngOnInit(): void {

    let scheduleId = null;
    this.route
        .queryParams
        .subscribe(params => {          
          
          this.schedule.doctor = new Employee();
          
          scheduleId = params['scheduleId'];
          
          if (scheduleId != null) {
              this.genericService.getOne(scheduleId, 'Schedule')
                  .subscribe(result => {
                if (result.id > 0) {
                  this.schedule = result
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
    this.schedule = null;
  }

  save() {
    try {
      this.error = '';
      this.genericService.save(this.schedule, "Schedule")
        .subscribe(result => {
          if (result.id > 0) {
            this.schedule = result
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

 }
