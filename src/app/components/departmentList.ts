import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Department } from '../models/department';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../app.constants';
import { FileUploader } from './fileUploader';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService } from '../services';

@Component({
  selector: 'app-department-list',
  templateUrl: '../pages/departmentList.html',
  providers: [GenericService]
})
export class DepartmentList implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  departments: Department[] = [];
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
            { field: 'name', header: 'Name' },
            { field: 'description', header: 'Description' },
            { field: 'status', header: 'Status' }
        ];
    
    this.genericService.getAll('Department')
      .subscribe((data: Department[]) => 
      { 
        this.departments = data 
      },
      error => console.log(error),
      () => console.log('Get all Authors complete'));
  }
 
  
  ngOnDestroy() {
    this.departments = null;
  }
  
  edit(departmentId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "departmentId": departmentId,
        }
      }
      this.router.navigate(["/admin/departmentDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

  delete(departmentId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "departmentId": departmentId,
        }
      }
      this.router.navigate(["/admin/departmentDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

 }
