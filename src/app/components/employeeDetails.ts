import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Department } from '../models/department';
import { Constants } from '../app.constants';
import { Employee } from '../models/employee';
import { UserGroup } from '../models/userGroup';
import { FileUploader } from './fileUploader';
import { EditorModule } from 'primeng/editor';
import { DepartmentDropdown, UserGroupDropdown, CountryDropdown } from './dropdowns';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { DataTableModule, DialogModule, InputTextareaModule, CheckboxModule } from 'primeng/primeng';
import { User } from '../models/user';  
import { GenericService, UserService } from '../services';

@Component({
  selector: 'app-employee-details',
  templateUrl: '../pages/employeeDetails.html',
  providers: [GenericService, DepartmentDropdown, UserGroupDropdown, CountryDropdown]
})
export class EmployeeDetails implements OnInit, OnDestroy {
  
  public error: String = '';
  displayDialog: boolean;
  employee: Employee = new Employee();
  departmentDropdown: DepartmentDropdown;
  userGroupDropdown: UserGroupDropdown;
  countryDropdown:  CountryDropdown;
  
  DETAIL: string = Constants.DETAIL;
  ADD_IMAGE: string = Constants.ADD_IMAGE;
  ADD_LABEL: string = Constants.ADD_LABEL;  
  DEPARTMENT: string = Constants.DEPARTMENT;
  COUNTRY: string = Constants.COUNTRY;
  ROLE: string = Constants.ROLE;
  
  constructor
    (
      private genericService: GenericService,
      private userService: UserService,
      private dptDropdown: DepartmentDropdown,
      private usrGrpDropdown: UserGroupDropdown,
      private cntryDropdown: CountryDropdown,
      private changeDetectorRef: ChangeDetectorRef,
      private route: ActivatedRoute,
      private router: Router
    ) {
      this.departmentDropdown = dptDropdown;
      this.userGroupDropdown = usrGrpDropdown;
      this.countryDropdown = cntryDropdown;
  }

  ngOnInit(): void {

    let employeeId = null;
    this.route
        .queryParams
        .subscribe(params => {          
          
          this.employee.user = new User();
          this.employee.user.userGroup = new UserGroup();
          employeeId = params['employeeId'];
          
          if (employeeId != null) {
              this.genericService.getOne(employeeId, 'Employee')
                  .subscribe(result => {
                if (result.id > 0) {
                  this.employee = result
                }
                else {
                  this.error = Constants.saveFailed;
                  this.displayDialog = true;
                }
              })
          } else {
              
              if (params['groupId'] != null) {
                this.employee.user.userGroup.id = params['groupId'];
              }
          }
        });
    
  }
  
  ngOnDestroy() {
    this.employee = null;
  }

  save() {
    try {
      this.error = '';
      this.userService.saveEmployee(this.employee)
        .subscribe(result => {
          if (result.id > 0) {
            this.employee = result
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
