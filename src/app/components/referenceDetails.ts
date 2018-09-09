import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Reference } from '../models/reference';
import { CategoryDropdown } from './dropdowns';
import { Constants } from '../app.constants';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService, GlobalEventsManager } from '../services';

@Component({
  selector: 'app-reference-details',
  templateUrl: '../pages/referenceDetails.html',
  providers: [GenericService, CategoryDropdown]
  
})
export class ReferenceDetails implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  reference: Reference = new Reference();
  category: Reference = new Reference();
  referenceType: string = null;
  parentId: number = null;
  categoryDropdown: CategoryDropdown;
  
  hiddenMenu: boolean = false;
  
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;  
  
  constructor
    (
      private genericService: GenericService,
      private categDropdown: CategoryDropdown,
      private globalEventsManager: GlobalEventsManager,
      private changeDetectorRef: ChangeDetectorRef,
      private route: ActivatedRoute,
      private router: Router
    ) {
      this.categoryDropdown = categDropdown;
      this.categoryDropdown.getGroupCategories();
      this.reference = new Reference();
  }

  
  
  ngOnInit(): void {
    this.reference = new Reference();
    let referenceId = null;
    this.route
        .queryParams
        .subscribe(params => {
          referenceId = params['referenceId'];
          if (this.referenceType == null && params['referenceType'] == null) {
             this.referenceType = this.globalEventsManager.selectedReferenceType;
             this.hiddenMenu = true;     
          } else {
            this.referenceType = params['referenceType'];
            this.hiddenMenu = false;
          }
          this.parentId = params['parentId'];
          if (this.parentId == null) {
            this.parentId = this.globalEventsManager.selectedParentId;
          } 
          
          if (referenceId != null) {
              this.genericService.getOne(referenceId, this.referenceType)
                  .subscribe(result => {
                if (result.id > 0) {
                  this.reference = result
                }
                else {
                  this.error = Constants.SAVE_UNSUCCESSFUL;
                  this.displayDialog = true;
                }
              })
          }
        });
    
  }
  
  ngOnDestroy() {
    this.reference = null;
  }

  getReference(referenceId: number, referenceType: string) {
    this.genericService.getOne(referenceId, referenceType)
        .subscribe(result => {
      if (result.id > 0) {
        this.reference = result
      }
      else {
        this.error = Constants.SAVE_UNSUCCESSFUL;
        this.displayDialog = true;
      }
    })
  }
  
  clear() {
    this.reference = new Reference();
    this.reference.parent = new Reference();
    this.reference.parent.id = this.parentId;
  }
  
  save() {
    try {
      this.error = '';
      this.reference.parent = new Reference();
      this.reference.parent.id = this.parentId;
      if (this.category.id > 0) {
        this.reference.parent.id = this.category.id;
        this.referenceType = 'Category';
      }
      
      this.genericService.save(this.reference, this.referenceType)
        .subscribe(result => {
          if (result.id > 0) {
            this.reference = result
          }
          else {
            this.error = Constants.SAVE_UNSUCCESSFUL;
            this.displayDialog = true;
          }
        })
    }
    catch (e) {
      console.log(e);
    }
  }

 }
