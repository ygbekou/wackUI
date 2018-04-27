import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Reference } from '../models/reference';
import { DepartmentDropdown } from './dropdowns/dropdown.department';
import { Constants } from '../app.constants';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService } from '../services';

@Component({
  selector: 'app-reference-details',
  templateUrl: '../pages/referenceDetails.html',
  providers: [GenericService]
  
})
export class ReferenceDetails implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  reference: Reference = new Reference();
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
      private router: Router
    ) {
      
  }

  ngOnInit(): void {
    let referenceId = null;
    this.route
        .queryParams
        .subscribe(params => {
          referenceId = params['referenceId'];
          this.referenceType = params['referenceType'];
          this.parentId = params['parentId'];
          
          if (referenceId != null) {
              this.genericService.getOne(referenceId, this.referenceType)
                  .subscribe(result => {
                if (result.id > 0) {
                  this.reference = result
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
    this.reference = null;
  }

  save() {
    try {
      this.error = '';
      this.reference.parent = new Reference();
      this.reference.parent.id = this.parentId;
      
      this.genericService.save(this.reference, this.referenceType)
        .subscribe(result => {
          if (result.id > 0) {
            this.reference = result
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

 }
