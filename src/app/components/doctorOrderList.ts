import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../app.constants';
import { DoctorOrder } from '../models/doctorOrder';
import { VitalSign } from '../models/vitalSign';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService } from '../services';

@Component({
  selector: 'app-doctorOrder-list',
  templateUrl: '../pages/doctorOrderList.html',
  providers: [GenericService]
})
export class DoctorOrderList implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  doctorOrders: DoctorOrder[] = [];
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
            { field: 'doctorOrderDatetime', header: 'Date Time', type:'date' },
            { field: 'patientId', header: 'Patient ID' },
            { field: 'patientName', header: 'Patient Name' },
            { field: 'doctorOrderTypeName', header: 'Type' },
            { field: 'description', header: 'Description' }
        ];
    
    this.route
        .queryParams
        .subscribe(params => {          
          
            this.genericService.getAll('DoctorOrder')
              .subscribe((data: DoctorOrder[]) => 
              { 
                this.doctorOrders = data 
              },
              error => console.log(error),
              () => console.log('Get all DoctorOrders complete'));
          });
  }
 
  
  ngOnDestroy() {
    this.doctorOrders = null;
  }
  
  edit(doctorOrderId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "doctorOrderId": doctorOrderId,
        }
      }
      this.router.navigate(["/admin/doctorOrderDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

  delete(doctorOrderId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "doctorOrderId": doctorOrderId,
        }
      }
      this.router.navigate(["/admin/doctorOrderDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

 }
