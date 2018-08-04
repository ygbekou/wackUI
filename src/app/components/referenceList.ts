import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Reference } from '../models/reference';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../app.constants';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService, GlobalEventsManager } from '../services';

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
  hiddenMenu: boolean = false;
  @Output() referenceIdEvent = new EventEmitter<string>();
  
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL; 
  
  constructor
    (
    private genericService: GenericService,
    private globalEventsManager: GlobalEventsManager,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    ) {
  }

  ngOnInit(): void {
    this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'description', header: 'Description' },
            { field: 'statusDesc', header: 'Status' }
        ];
    
    this.route
        .queryParams
        .subscribe(params => {
          this.referenceType = params['referenceType'];
          if (this.referenceType == null) {
            this.referenceType = this.globalEventsManager.selectedReferenceType;
            this.hiddenMenu = true;
          } else {
            this.hiddenMenu = false;
          }
          
          this.parentId = params['parentId'];
          if (this.parentId == null) {
            this.parentId = this.globalEventsManager.selectedParentId;
          } 
          
          let parameters: string [] = []; 
            
          if (this.parentId != null && this.referenceType == 'Category') {
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
      if (this.hiddenMenu) {
        this.referenceIdEvent.emit(referenceId + '');
      } else {
        let navigationExtras: NavigationExtras = {
          queryParams: {
            "referenceId": referenceId,
            "referenceType": referenceType
          }
        }
        this.router.navigate(["/admin/referenceDetails"], navigationExtras);
      }
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
