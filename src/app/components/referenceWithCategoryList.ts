import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../app.constants';
import { ReferenceWithCategory } from '../models/referenceWithCategory';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { GenericService, GlobalEventsManager } from '../services';

@Component({ 
  selector: 'app-referenceWithCategory-list',
  templateUrl: '../pages/referenceWithCategoryList.html',
  providers: [GenericService]
})
export class ReferenceWithCategoryList implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  referenceWithCategories: ReferenceWithCategory[] = [];
  cols: any[];
  
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;  
  
  @Output() referenceWithCategoryIdEvent = new EventEmitter<string>();
  
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
            { field: 'categoryName', header: 'Category' },
            { field: 'name', header: 'Name' },
            { field: 'description', header: 'Description' },
            { field: 'statusDesc', header: 'Status', type:'string' }
        ];
    
    this.route
        .queryParams
        .subscribe(params => {          
          
            let parameters: string [] = []; 
            //parameters.push('e.status = |status|0|Integer')
            
            this.genericService.getAllByCriteria(this.globalEventsManager.selectedReferenceWithCategoryType, parameters)
              .subscribe((data: ReferenceWithCategory[]) => 
              { 
                this.referenceWithCategories = data 
                console.info(this.referenceWithCategories)
              },
              error => console.log(error),
              () => console.log('Get all Symptoms complete'));
          });
  }
 
  
  ngOnDestroy() {
    this.referenceWithCategories = null;
  }
  
  edit(referenceWithCategoryId : number) {
    try {
//      let navigationExtras: NavigationExtras = {
//        queryParams: {
//          "symmtomId": symmtomId,
//        }
//      }
//      this.router.navigate(["/admin/symmtomDetails"], navigationExtras);
      this.referenceWithCategoryIdEvent.emit(referenceWithCategoryId + '');
    }
    catch (e) {
      console.log(e);
    }
  }

  delete(symmtomId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "symmtomId": symmtomId,
        }
      }
      this.router.navigate(["/admin/referenceWithCategoryDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

 }
