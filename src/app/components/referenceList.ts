import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Reference } from '../models/reference';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../app.constants';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService } from '../services';

@Component({
  selector: 'app-reference-list',
  templateUrl: '../pages/referenceList.html',
  providers: [GenericService]
})
export class ReferenceList implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  references: Reference[] = [];
  cols: any[];
  
  referenceType: string = null;
  parentId: number = null;
  
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
            { field: 'name', header: 'Name' },
            { field: 'description', header: 'Description' },
            { field: 'status', header: 'Status' }
        ];
    
    this.route
        .queryParams
        .subscribe(params => {
          this.referenceType = params['referenceType'];
          this.parentId = params['parentId'];
          
          let parameters: string [] = []; 
            
          if (this.parentId != null) {
            parameters.push('e.parent.id = |parentId|' + this.parentId + '|Long')
          } 
          
          this.genericService.getAllByCriteria(this.referenceType, parameters)
            .subscribe((data: Reference[]) => 
            { 
              this.references = data 
            },
            error => console.log(error),
            () => console.log('Get all Authors complete'));
     });
    
    
  }
 
  
  ngOnDestroy() {
    this.references = null;
  }
  
  edit(referenceId : number, referenceType) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "referenceId": referenceId,
          "referenceType": referenceType
        }
      }
      this.router.navigate(["/admin/referenceDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

  delete(referenceId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "referenceId": referenceId,
        }
      }
      this.router.navigate(["/admin/referenceDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

 }
