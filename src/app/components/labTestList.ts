import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../app.constants';
import { LabTest } from '../models/labTest';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { GenericService } from '../services';

@Component({
  selector: 'app-labTest-list',
  templateUrl: '../pages/labTestList.html',
  providers: [GenericService]
})
export class LabTestList implements OnInit, OnDestroy {
  
  public error: String = ''; 
  displayDialog: boolean;
  labTests: LabTest[] = [];
  cols: any[];
  
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;  
  
  @Output() labTestIdEvent = new EventEmitter<string>();
  
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
            { field: 'name'             , header: 'Name' },
            { field: 'description'      , header: 'Description' },
            { field: 'normalRange'      , header: 'Normal Range' },
            { field: 'methodName'       , header: 'Method' },
            { field: 'groupName'        , header: 'Group' },
            { field: 'statusDesc'       , header: 'Status', type:'string' }
        ];
    
    this.route
        .queryParams
        .subscribe(params => {          
          
            let parameters: string [] = []; 
            
            
            this.genericService.getAllByCriteria('LabTest', parameters)
              .subscribe((data: LabTest[]) => 
              { 
                this.labTests = data 
                console.info(this.labTests)
              },
              error => console.log(error),
              () => console.log('Get all Lab Tests complete'));
          });
  }
 
  
  ngOnDestroy() {
    this.labTests = null;
  }
  
  edit(labTestId: number) {
      this.labTestIdEvent.emit(labTestId + '');
  }

  delete(labTestId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "labTestId": labTestId,
        }
      }
      this.router.navigate(["/admin/labTestDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }
  
  getAllLabTests() {
    this.genericService.getAll('LabTest')
      .subscribe((data: LabTest[]) => 
      { 
        this.labTests = data 
        console.info(this.labTests)
      },
      error => console.log(error),
      () => console.log('Get all Lab Tests complete'));
  }

 }
