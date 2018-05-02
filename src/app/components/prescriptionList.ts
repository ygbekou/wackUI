import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Employee } from '../models/employee';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../app.constants';
import { CaseStudy } from '../models/caseStudy';
import { Prescription } from '../models/prescription';
import { Schedule } from '../models/schedule';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService } from '../services';

@Component({
  selector: 'app-prescription-list',
  templateUrl: '../pages/prescriptionList.html',
  providers: [GenericService]
})
export class PrescriptionList implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  prescriptions: Prescription[] = [];
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
            { field: 'appointmentId', header: 'Appointment ID' },
            { field: 'prescriptionType', header: 'Type' },
            { field: 'doctorName', header: 'Type' },
            { field: 'status', header: 'Status', type:'string' }
        ];
    
    this.route
        .queryParams
        .subscribe(params => {          
          
            let parameters: string [] = []; 
            
            parameters.push('e.status = |status|0|Integer')
            
            this.genericService.getAllByCriteria('Prescription', parameters)
              .subscribe((data: Prescription[]) => 
              { 
                this.prescriptions = data 
              },
              error => console.log(error),
              () => console.log('Get all Prescriptions complete'));
          });
  }
 
  
  ngOnDestroy() {
    this.prescriptions = null;
  }
  
  edit(prescriptionId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "prescriptionId": prescriptionId,
        }
      }
      this.router.navigate(["/admin/prescriptionDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

  delete(prescriptionId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "prescriptionId": prescriptionId,
        }
      }
      this.router.navigate(["/admin/prescriptionDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

 }
