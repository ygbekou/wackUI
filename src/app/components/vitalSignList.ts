import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../app.constants';
import { Admission } from '../models';
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
  
  vitalSigns: VitalSign[] = [];
  cols: any[];
  
  @Input() admission: Admission;
  @Output() vitalSignIdEvent = new EventEmitter<string>();

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
            { field: 'patientMRN', header: 'Patient ID' },
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
    
    let parameters: string [] = []; 
 
    if (this.admission && this.admission.id > 0)  {
      parameters.push('e.admission.id = |admissionId|' + this.admission.id + '|Long')
    } 
    
    this.route
        .queryParams
        .subscribe(params => {          
          
        this.genericService.getAllByCriteria('VitalSign', parameters)
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
  
  edit(prescriptionId: string) {
    this.vitalSignIdEvent.emit(prescriptionId);
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
