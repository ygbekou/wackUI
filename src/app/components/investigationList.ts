import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Admission, Employee, Investigation, InvestigationTest, Prescription, User, Visit } from '../models';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../app.constants';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToolbarModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { GenericService, InvestigationService, GlobalEventsManager } from '../services';

@Component({ 
  selector: 'app-investigation-list',
  templateUrl: '../pages/investigationList.html',
  providers: [GenericService, InvestigationService, ToolbarModule] 
})
export class InvestigationList implements OnInit, OnDestroy {
  
  error: string = '';
  message: string;
  displayDialog: boolean;
  investigations: Investigation[] = [];
  selectedInvestigations: any[] = [];
  selectedInvestigation: Investigation;
  cols: any[];
  iTCols: any[];
  
  @Input() showActions: boolean = true;
  @Input() admission: Admission;
  @Input() visit: Visit;
  @Output() investigationIdEvent = new EventEmitter<string>();
  
  parentSelection: any[] = [];
  
  actionType: string;
  actionDatetime: Date;
  actionComments: string;
  display: boolean;
  
  
  
  constructor
    (
    private globalEventsManager: GlobalEventsManager,
    private genericService: GenericService,
    private investigationService: InvestigationService,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    ) {

  }

  ngOnInit(): void {
    this.cols = [
            { field: 'investigationDatetime', header: 'Date', type: 'Date' },
            { field: 'name', header: 'Name' },
            { field: 'labTestName', header: 'LabTest/Group' },
            { field: 'statusDesc', header: 'Status' },
            { field: 'collectionDatetime', header: 'Coll Date', type: 'Date' },
            { field: 'finalizationDatetime', header: 'Finalized Date', type: 'Date' }
        ];
    
    this.iTCols = [
            { field: 'name', header: 'Name' },
            { field: 'method', header: 'Method' },
            { field: 'result', header: 'Result' },
            { field: 'normalRange', header: 'Normal Range' },
            { field: 'unit', header: 'Unit' },
            { field: 'interpretation', header: 'Interpretation' },
            { field: 'impression', header: 'Impression' },
            { field: 'resultDatetime', header: 'Result Date', type: 'Date' },
            { field: 'dispatchDatetime', header: 'Dispatch Date', type: 'Date' }
        ];
    
    this.getInvestigations();
  }
 
  
  ngOnDestroy() {
    this.investigations = null;
  }
  
  edit(investigationId: string) {
    this.investigationIdEvent.emit(investigationId);
  }
  
  getInvestigations() {
     
      let parameters: string [] = []; 
            
      if (this.visit && this.visit.id > 0)  {
         parameters.push('e.visit.id = |visitId|' + this.visit.id + '|Long');
         parameters.push('e.status = |status|4|Integer');
      } 
      if (this.admission && this.admission.id > 0)  {
         parameters.push('e.admission.id = |admissionId|' + this.admission.id + '|Long');
         parameters.push('e.status = |status|4|Integer')
      } 
        
        
      this.genericService.getAllByCriteria('Investigation', parameters)
         .subscribe((data: Investigation[]) => 
          { 
            this.investigations = data 
            console.log(this.investigations)
          },
          error => console.log(error),
          () => console.log('Get all Investigations complete'));
      }
  
   getInvestigationTests(investigation: Investigation) {
     let parameters: string [] = []; 
     parameters.push('e.investigation.id = |investigationId|' + investigation.id + '|Long')
        
      this.genericService.getAllByCriteria('InvestigationTest', parameters)
      .subscribe((data: any[]) => 
      { 
          investigation.investigationTests = data;
          console.log(data)
      },
      error => console.log(error),
      () => console.log('Get LabTest List complete'));
   }
  
  
  showInvestigationDialog(actionType: string, rowData: Investigation) {
    this.actionType = actionType;
    this.selectedInvestigation = rowData;
    this.display = true;
  }
  
  saveAction() {
    
    try {
      
      if (this.actionType === 'Collection') {
        this.selectedInvestigation.status = 1;
        this.selectedInvestigation.collectionDatetime = this.actionDatetime;
        this.selectedInvestigation.collectionComments = this.actionComments;
      } else if (this.actionType === 'Rejection') {
        this.selectedInvestigation.status = 2;
        this.selectedInvestigation.rejectionDatetime = this.actionDatetime;
        this.selectedInvestigation.rejectionComments = this.actionComments;
      } else if (this.actionType === 'Finalization') {
        this.selectedInvestigation.status = 4;
        this.selectedInvestigation.finalizationDatetime = this.actionDatetime;
        this.selectedInvestigation.finalizationComments = this.actionComments;
      } 
      this.investigationService.saveInvestigaton(this.selectedInvestigation)
        .subscribe(result => {
          if (result.id > 0) {
            this.display = false;
          }
          else {
            this.error = Constants.SAVE_UNSUCCESSFUL;
            this.display = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }
  
  
  getStatusDesc(investigation: Investigation): string {
    let statusDesc = '';
    if (investigation.status === 0) {
      statusDesc = 'New';
    } else if (investigation.status === 1) {
      statusDesc = 'Collected';
    } else if (investigation.status === 2) {
      statusDesc = 'Rejected';
    } else if (investigation.status === 4) {
      statusDesc = 'Finalized';
    }
    return statusDesc; 
  }
  
  getResult(investigationTest: InvestigationTest): number {
     return Number(investigationTest.result);
  }
  
  saveResult(investigationTest: InvestigationTest) {
    this.genericService.save(investigationTest, 'InvestigationTest')
        .subscribe(result => {
          if (result.id > 0) {
            this.message = Constants.SAVE_SUCCESSFUL;
          }
          else {
            this.error = Constants.SAVE_UNSUCCESSFUL;
          }
        })
  }
  
 }
