import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {  } from 'primeng/primeng';
import { GenericService } from '../services';
import { Employee, User, SearchCriteria } from '../models';
import { DepartmentDropdown } from './dropdowns';
import { TranslateService, LangChangeEvent} from '@ngx-translate/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: '../pages/employeeList.html',
  providers: [GenericService, DepartmentDropdown]
})
export class EmployeeList implements OnInit, OnDestroy {
  
  employees: Employee[] = [];
  cols: any[];
  searchCriteria: SearchCriteria = new SearchCriteria();
  
  constructor
    (
    private genericService: GenericService,
    private translate: TranslateService,
    private changeDetectorRef: ChangeDetectorRef,
    private departmentDropdown: DepartmentDropdown,
    private route: ActivatedRoute,
    private router: Router,
    ) {

    
  }
  
  updateCols() {
    for (var index in this.cols) {
      let col = this.cols[index];
      this.translate.get(col.headerKey).subscribe((res: string) => {
        col.header = res;
      });
    }
  }

  ngOnInit(): void {
    this.cols = [
            { field: 'lastName', header: 'Last Name', headerKey: 'COMMON.LAST_NAME', type:'user' },
            { field: 'firstName', header: 'First Name', headerKey: 'COMMON.FIRST_NAME', type:'user' },
            { field: 'departmentName', header: 'Department', headerKey: 'COMMON.DEPARTMENT', type:'department' },
            { field: 'groupName', header: 'Role', headerKey: 'COMMON.ROLE' },
            { field: 'email', header: 'Email', headerKey: 'COMMON.E_MAIL', type:'user' },
            { field: 'phone', header: 'Phone', headerKey: 'COMMON.PHONE', type:'user' },
            { field: 'sex', header: 'Gender', headerKey: 'COMMON.GENDER', type:'user' },
            { field: 'status', header: 'Status', headerKey: 'COMMON.STATUS', type:'string' }
        ];
    
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.updateCols();
    });
  }
 
  
  ngOnDestroy() {
    this.employees = null;
  }
  
  edit(employeeId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "employeeId": employeeId,
        }
      }
      this.router.navigate(["/admin/employeeDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

  delete(employeeId : number) {
    try {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "employeeId": employeeId,
        }
      }
      this.router.navigate(["/admin/employeeDetails"], navigationExtras);
    }
    catch (e) {
      console.log(e);
    }
  }

  search() {
   
        let parameters: string [] = []; 
            
        if (this.searchCriteria.lastName != null && this.searchCriteria.lastName.length > 0)  {
          parameters.push('e.user.lastName like |lastName|' + '%' + this.searchCriteria.lastName + '%' + '|String')
        }
        if (this.searchCriteria.firstName != null && this.searchCriteria.firstName.length > 0)  {
          parameters.push('e.user.firstName like |firstName|' + '%' + this.searchCriteria.firstName + '%' + '|String')
        } 
        if (this.searchCriteria.department != null && this.searchCriteria.department.id > 0)  {
          parameters.push('e.department.id = |departmentId|' + this.searchCriteria.department.id + '|Long')
        }  
        
        
        this.genericService.getAllByCriteria('Employee', parameters)
          .subscribe((data: Employee[]) => 
          { 
            this.employees = data 
          },
          error => console.log(error),
          () => console.log('Get all Employees complete'));
  }

  getStatusDesc(employee: Employee): string {
    let statusDesc = '';
    if (employee.status === 0) {
      statusDesc = 'Actif';
    } else if (employee.status === 1) {
      statusDesc = 'Inactif';
    } 
    return statusDesc; 
  }
 }
