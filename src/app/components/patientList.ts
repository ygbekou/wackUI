import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Patient } from '../models/patient';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../app.constants';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService } from '../services';

@Component({
  selector: 'app-patient-list',
  templateUrl: '../pages/patientList.html',
  providers: [GenericService]
})
export class PatientList implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  patients: Patient[] = [];
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
            { field: 'lastName', header: 'Last Name', type:'user' },
            { field: 'firstName', header: 'First Name', type:'user' },
            { field: 'email', header: 'Email Address', type:'user' },
            { field: 'phone', header: 'Phone', type:'user' },
            { field: 'address', header: 'Address', type:'user' },
            { field: 'sex', header: 'Sex', type:'user' },
            { field: 'status', header: 'Status', type:'string' }
        ];
    
      let userGroupId = null;
      this.route
        .queryParams
        .subscribe(params => {          
          
            userGroupId = params['groupId'];
          
            let parameters: string [] = []; 
            
            if (userGroupId != null) {
              parameters.push('e.user.userGroup.id = |userGroupId|' + userGroupId + '|Long')
            } else {
              parameters.push('e.user.userGroup.id != |userGroupId|1|Long')
            }
            this.genericService.getAllByCriteria('Patient', parameters)
              .subscribe((data: Patient[]) => 
              { 
                this.patients = data 
              },
              error => console.log(error),
              () => console.log('Get all Patients complete'));
          });
  }
 
  
  ngOnDestroy() {
    this.patients = null;
  }
  
  edit(patientId: number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "patientId": patientId,
        }
      }
      this.router.navigate(["/admin/patientDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

  delete(patientId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "patientId": patientId,
        }
      }
      this.router.navigate(["/admin/patientDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

 }
