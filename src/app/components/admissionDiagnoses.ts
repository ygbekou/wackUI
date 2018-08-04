import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Reference } from '../models/reference';
import { Constants } from '../app.constants';
import { Admission } from '../models/admission';
import { AdmissionDiagnosis } from '../models/admissionDiagnosis';
import { Diagnosis } from '../models/diagnosis';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DiagnosisDropdown } from './dropdowns';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService, GlobalEventsManager, AdmissionService } from '../services';

@Component({ 
  selector: 'app-admissionDiagnoses',
  templateUrl: '../pages/admissionDiagnoses.html',
  providers: [GenericService, DiagnosisDropdown]
  
}) 
export class AdmissionDiagnoses implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  admissionDiagnosis: AdmissionDiagnosis = new AdmissionDiagnosis();
   
  diagnosisCols: any[];
  admissionDiagnoses: AdmissionDiagnosis[] = [];
  
  hiddenMenu: boolean = true;
  
  diagnosisDropdown: DiagnosisDropdown;
  
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;  
  
  @Input() admission: Admission;
  
  constructor
    (
      private admissionService: AdmissionService,
      private genericService: GenericService,
      private globalEventsManager: GlobalEventsManager,
      private dgnDropdown: DiagnosisDropdown,
      private changeDetectorRef: ChangeDetectorRef,
      private route: ActivatedRoute,
      private router: Router
    ) {
      this.diagnosisDropdown = dgnDropdown;
      this.clear();
  }

  
  ngOnInit(): void {
    
    this.diagnosisCols = [
            { field: 'name', parent:'diagnosis', header: 'Name' },
            { field: 'description', parent:'diagnosis', header: 'Description' },
            { field: 'instructions', header: 'Instructions' }
        ];
    
    this.admissionDiagnoses.push(new AdmissionDiagnosis());
    
    this.clear();
    let admissionDiagnosisId = null;
    this.route
        .queryParams
        .subscribe(params => {
          admissionDiagnosisId = params['admissionDiagnosisId'];
          
          if (admissionDiagnosisId != null) {
              this.genericService.getOne(admissionDiagnosisId, 'AdmissionDiagnosis')
                  .subscribe(result => {
                if (result.id > 0) {
                  this.admissionDiagnosis = result
                }
                else {
                  this.error = Constants.saveFailed;
                  this.displayDialog = true;
                }
              })
          }
        });
    
  }
  
  ngOnDestroy() {
    this.admissionDiagnosis = null;
  }

  getAdmissionDiagnosis(admissionDiagnosisId: number) {
    this.genericService.getOne(admissionDiagnosisId, 'AdmissionDiagnosis')
        .subscribe(result => {
      if (result.id > 0) {
        this.admissionDiagnosis = result
      }
      else {
        this.error = Constants.saveFailed;
        this.displayDialog = true;
      }
    })
  }
  
  saveDiagnosis(rowData) {
    rowData.admission = this.admission;
    try {
      this.error = '';
      
      this.genericService.save(rowData, 'AdmissionDiagnosis')
        .subscribe(result => {
          if (result.id > 0) {
            rowData = result
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
  
  clear() {
    this.admissionDiagnosis = new AdmissionDiagnosis();
    this.admissionDiagnosis.admission = new Admission();
    this.admissionDiagnosis.diagnosis = new Diagnosis()
  }
  
  getAdmissionDiagnoses() {
    this.admissionService.getAdmissionDiagnoses(+this.admission.id)
     .subscribe((data: AdmissionDiagnosis[]) => 
      { 
        this.admissionDiagnoses = data;
        if (this.admissionDiagnoses != null 
              && this.admissionDiagnoses.length == 0) {
          let ad = new AdmissionDiagnosis();
          ad.diagnosis = new Diagnosis();
          this.admissionDiagnoses.push(new AdmissionDiagnosis());
        }
      },
      error => console.log(error),
      () => console.log('Get Patient Admission Diagnoses complete'));
  }
}