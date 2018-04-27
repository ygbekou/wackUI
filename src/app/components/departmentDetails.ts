import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Department } from '../models/department';
import { DepartmentDropdown } from './dropdowns/dropdown.department';
import { Constants } from '../app.constants';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService } from '../services';

@Component({
  selector: 'app-department-details',
  templateUrl: '../pages/departmentDetails.html',
  providers: [GenericService]
})
export class DepartmentDetails implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  department: Department = new Department();
  
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
    let departmentId = null;
    this.route
        .queryParams
        .subscribe(params => {
          departmentId = params['departmentId'];
          
          if (departmentId != null) {
              this.genericService.getOne(departmentId, 'Department')
                  .subscribe(result => {
                if (result.id > 0) {
                  this.department = result
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
    this.department = null;
  }

  save() {
    try {
      this.error = '';
      this.genericService.save(this.department, 'Department')
        .subscribe(result => {
          if (result.id > 0) {
            this.department = result
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
