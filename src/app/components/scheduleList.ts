import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Employee } from '../models/employee';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../app.constants';
import { Schedule } from '../models/schedule';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService } from '../services';

@Component({
  selector: 'app-schedule-list',
  templateUrl: '../pages/scheduleList.html',
  providers: [GenericService]
})
export class ScheduleList implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  schedules: Schedule[] = [];
  cols: any[];
  
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;  
  
  constructor
    (
    private genericService: GenericService,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    ) {

    
  }

  ngOnInit(): void {
    this.cols = [
            { field: 'doctorName', header: 'Doctor' },
            { field: 'doctorDepartmentName', header: 'Department' },
            { field: 'day', header: 'Day' },
            { field: 'beginTime', header: 'Start Time' },
            { field: 'endTime', header: 'End Time' },
            { field: 'perPatientTime', header: 'Per Patient Time' },
            { field: 'status', header: 'Status', type:'string' }
        ];
    
    this.route
        .queryParams
        .subscribe(params => {          
          
            let parameters: string [] = []; 
            
            parameters.push('e.status = |status|0|Integer')
            
            this.genericService.getAllByCriteria('Schedule', parameters)
              .subscribe((data: Schedule[]) => 
              { 
                this.schedules = data 
                console.info(this.schedules)
              },
              error => console.log(error),
              () => console.log('Get all Schedule complete'));
          });
  }
 
  
  ngOnDestroy() {
    this.schedules = null;
  }
  
  edit(scheduleId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "scheduleId": scheduleId,
        }
      }
      this.router.navigate(["/admin/scheduleDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

  delete(scheduleId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "scheduleId": scheduleId,
        }
      }
      this.router.navigate(["/admin/scheduleDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

 }
