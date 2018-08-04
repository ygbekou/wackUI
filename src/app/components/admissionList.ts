import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Employee } from '../models/employee';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../app.constants';
import { Admission } from '../models/admission';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService } from '../services';

@Component({
  selector: 'app-patientAdmission-list',
  templateUrl: '../pages/admissionList.html',
  providers: [GenericService]
})
export class AdmissionList implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  admissions: Admission[] = [];
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
            { field: 'admissionNumber', header: 'Admission No' },
            { field: 'admissionDatetime', header: 'Date', type:'date' },
            { field: 'patientId', header: 'Patient ID' },
            { field: 'patientName', header: 'Patient Name' },
            
            { field: 'status', header: 'Status', type:'string' }
        ];
    
    this.route
        .queryParams
        .subscribe(params => {          
          
            let parameters: string [] = []; 
            
            parameters.push('e.status = |status|0|Integer')
            
            this.genericService.getAllByCriteria('Admission', parameters)
              .subscribe((data: Admission[]) => 
              { 
                this.admissions = data 
              },
              error => console.log(error),
              () => console.log('Get all Admission complete'));
          });
  }
 
  
  ngOnDestroy() {
    this.admissions = null;
  }
  
  edit(admissionId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "admissionId": admissionId,
        }
      }
      this.router.navigate(["/admin/adminAdmission"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

  delete(admissionId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "admissionId": admissionId,
        }
      }
      this.router.navigate(["/admin/admissionDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

 }
