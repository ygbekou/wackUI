import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
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
import { TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-employee-details',
  templateUrl: '../pages/employeeDetails.html',
  providers: [GenericService, UserService, DepartmentDropdown, UserGroupDropdown, CountryDropdown]
})
export class EmployeeDetails implements OnInit, OnDestroy {
  
  @ViewChild('uploadFile') input: ElementRef;
  formData = new FormData();
  
  public error: String = '';
  displayDialog: boolean;
  employee: Employee = new Employee();
  
  SAVE_LABEL: string = Constants.SAVE_LABEL;
  DELETE_LABEL: string = Constants.DELETE_LABEL;  
  CLEAR_LABEL: string = Constants.CLEAR_LABEL;
  DEPARTMENT: string = Constants.DEPARTMENT;
  COUNTRY: string = Constants.COUNTRY;
  ROLE: string = Constants.ROLE;
  
  constructor
    (
      private genericService: GenericService,
      private userService: UserService,
      private departmentDropdown: DepartmentDropdown,
      private userGroupDropdown: UserGroupDropdown,
      private countryDropdown: CountryDropdown,
      private changeDetectorRef: ChangeDetectorRef,
      private route: ActivatedRoute,
      private router: Router
    ) {
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
                  this.error = Constants.SAVE_UNSUCCESSFUL;
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
    this.formData = new FormData();
    let inputEl = this.input.nativeElement;
    //if (inputEl.files.length == 0) return;
    
    if (inputEl && inputEl.files && (inputEl.files.length > 0)) {
      let files :FileList = inputEl.files;
      for(var i = 0; i < files.length; i++){
          this.formData.append('file', files[i], files[i].name);
      }
    } else {
       this.formData.append('file', null, null);
    }
    try {
      this.error = '';
      if (inputEl && inputEl.files && (inputEl.files.length > 0)) {
        this.userService.saveUserWithPicture('Employee', this.employee, this.formData)
          .subscribe(result => {
            if (result.id > 0) {
              this.employee = result;
            }
            else {
              this.error = Constants.SAVE_UNSUCCESSFUL;
              this.displayDialog = true;
            }
          })
      }
      else {
        this.userService.saveUserWithoutPicture('Employee', this.employee)
          .subscribe(result => {
            if (result.id > 0) {
              this.employee = result;
            }
            else {
              this.error = Constants.SAVE_UNSUCCESSFUL;
              this.displayDialog = true;
            }
          })
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  clear() {
    this.employee = new Employee();
  }
  
  delete() {
    alert('To Do');
  }
 }
