import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Employee } from '../models/employee';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../app.constants';
import { PatientAdmission } from '../models/patientAdmission';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService } from '../services';

@Component({
  selector: 'app-patientAdmission-list',
  templateUrl: '../pages/patientAdmissionList.html',
  providers: [GenericService]
})
export class PatientAdmissionList implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  patientAdmissions: PatientAdmission[] = [];
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
            { field: 'patientId', header: 'Patient ID' },
            { field: 'patientName', header: 'Patient Name' },
            { field: 'doctorName', header: 'Doctor' },
            { field: 'packageName', header: 'Package' },
            { field: 'insuranceName', header: 'Insurance' },
            { field: 'policyNumber', header: 'POlicy Number' },
            { field: 'contactName', header: 'Contact Name' },
            { field: 'contactRelation', header: 'Contact Relation' },
            { field: 'contactPhone', header: 'Contant Phone' },
            { field: 'contactAddress', header: 'Contant Address' },
            { field: 'status', header: 'Status', type:'string' }
        ];
    
    this.route
        .queryParams
        .subscribe(params => {          
          
            let parameters: string [] = []; 
            
            parameters.push('e.status = |status|0|Integer')
            
            this.genericService.getAllByCriteria('PAtientAdmission', parameters)
              .subscribe((data: PatientAdmission[]) => 
              { 
                this.patientAdmissions = data 
              },
              error => console.log(error),
              () => console.log('Get all Patient Admission complete'));
          });
  }
 
  
  ngOnDestroy() {
    this.patientAdmissions = null;
  }
  
  edit(patientAdmissionId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "patientAdmissionId": patientAdmissionId,
        }
      }
      this.router.navigate(["/admin/patientAdmissionDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

  delete(patientAdmissionId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "patientAdmissionId": patientAdmissionId,
        }
      }
      this.router.navigate(["/admin/patientAdmissionDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

 }
