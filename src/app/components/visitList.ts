import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Employee } from '../models/employee';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../app.constants';
import { Visit } from '../models/visit';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService } from '../services';

@Component({
  selector: 'app-visit-list',
  templateUrl: '../pages/visitList.html',
  providers: [GenericService]
})
export class VisitList implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  visits: Visit[] = [];
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
            { field: 'id', header: 'Visit ID' },
            { field: 'visitDatetime', header: 'Date', type:'date' },
            { field: 'patientId', header: 'Patient ID' },
            { field: 'patientName', header: 'Patient Name' },
            { field: 'status', header: 'Status', type:'string' }
        ];
    
    this.route
        .queryParams
        .subscribe(params => {          
          
            let parameters: string [] = []; 
            
            parameters.push('e.status = |status|0|Integer')
            
            this.genericService.getAllByCriteria('Visit', parameters)
              .subscribe((data: Visit[]) => 
              { 
                this.visits = data 
              },
              error => console.log(error),
              () => console.log('Get all Admission complete'));
          });
  }
 
  
  ngOnDestroy() {
    this.visits = null;
  }
  
  edit(visitId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "visitId": visitId,
        }
      }
      this.router.navigate(["/admin/visitDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

  delete(visitId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "visitId": visitId,
        }
      }
      this.router.navigate(["/admin/visitDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

 }
