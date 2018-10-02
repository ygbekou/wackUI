import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { Employee } from '../../models/employee';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Constants } from '../../app.constants';
import { Admission } from '../../models/admission';
import { BirthReport } from '../../models/activities';
import { FileUploader } from './../fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../../models/user';  
import { GenericService, GlobalEventsManager } from '../../services';

@Component({ 
  selector: 'app-birthReport-list',
  templateUrl: '../../pages/activities/birthReportList.html',
  providers: [GenericService] 
})
  
export class BirthReportList implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  birthReports: BirthReport[] = [];
  cols: any[];
  
  constructor
    (
    private genericService: GenericService,
    private route: ActivatedRoute,
    private router: Router
    ) {
  }

  ngOnInit(): void {
    this.cols = [
            { field: 'birthDatetime', header: 'Date time', type:'date' },
            { field: 'name', header: 'Baby Name' },
            { field: 'fatherName', header: 'Father Name' },
            { field: 'motherName', header: 'Mother Name' },
            { field: 'comments', header: 'Notes' }
        ];
    
    this.route
        .queryParams
        .subscribe(params => {          
          
            let parameters: string [] = []; 
            
            let itemNumberLabel = params['itemNumberLabel'];
          
            parameters.push('e.status = |status|0|Integer')
            if (itemNumberLabel == 'Visit') 
              parameters.push('e.visit.id > |visitId|0|Long')
            if (itemNumberLabel == 'Admission') 
              parameters.push('e.admission.id > |admissionId|0|Long')
          
            this.genericService.getAllByCriteria(Constants.BIRTH_REPORT_CLASS, parameters)
              .subscribe((data: BirthReport[]) => 
              { 
                this.birthReports = data 
              },
              error => console.log(error),
              () => console.log('Get all BirthReport complete'));
          });
  }
 
  
  ngOnDestroy() {
    this.birthReports = null;
  }
  
  edit(birthReportId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "birthReportId": birthReportId,
        }
      }
      this.router.navigate(["/admin/birthReportDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

  delete(birthReportId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "birthReportId": birthReportId,
        }
      }
      this.router.navigate(["/admin/birthReportDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

 }
