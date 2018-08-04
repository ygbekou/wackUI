import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../app.constants';
import { VitalSign } from '../models/vitalSign';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService } from '../services';

@Component({
  selector: 'app-vitalSign-list',
  templateUrl: '../pages/vitalSignList.html',
  providers: [GenericService]
})
export class VitalSignList implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  vitalSigns: VitalSign[] = [];
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
            { field: 'vitalSignDatetime', header: 'Date', type:'date' },
            { field: 'patientId', header: 'Patient ID' },
            { field: 'patientName', header: 'Patient Name' },
            { field: 'temperature', header: 'Temperature' },
            { field: 'pulse', header: 'Pulse' },
            { field: 'respiration', header: 'Respiration' },
            { field: 'bloodPressure', header: 'Blood Pressure' },
            { field: 'bloodSugar', header: 'Blood Sugar' },
            { field: 'pain', header: 'Pain' },
            { field: 'weight', header: 'Weight(pound)' },
            { field: 'height', header: 'Height(in)' },
            { field: 'bmi', header: 'BMI' }
        ];
    
    this.route
        .queryParams
        .subscribe(params => {          
          
            this.genericService.getAll('VitalSign')
              .subscribe((data: VitalSign[]) => 
              { 
                this.vitalSigns = data 
              },
              error => console.log(error),
              () => console.log('Get all VitalSigns complete'));
          });
  }
 
  
  ngOnDestroy() {
    this.vitalSigns = null;
  }
  
  edit(vitalSignId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "vitalSignId": vitalSignId,
        }
      }
      this.router.navigate(["/admin/vitalSignDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

  delete(vitalSignId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "vitalSignId": vitalSignId,
        }
      }
      this.router.navigate(["/admin/vitalSignDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

 }
