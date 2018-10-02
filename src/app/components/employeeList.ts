import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Constants } from '../app.constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import {  } from 'primeng/primeng';
import { GenericService } from '../services';
import { Employee, User, SearchCriteria } from '../models';
import { DepartmentDropdown } from './dropdowns';

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
    private changeDetectorRef: ChangeDetectorRef,
    private departmentDropdown: DepartmentDropdown,
    private route: ActivatedRoute,
    private router: Router,
    ) {

    
  }

  ngOnInit(): void {
    this.cols = [
            { field: 'lastName', header: 'Last Name', type:'user' },
            { field: 'firstName', header: 'First Name', type:'user' },
            { field: 'departmentName', header: 'Department', type:'department' },
            { field: 'email', header: 'Email Address', type:'user' },
            { field: 'phone', header: 'Phone', type:'user' },
            { field: 'sex', header: 'Sex', type:'user' },
            { field: 'status', header: 'Status', type:'string' }
        ];
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
            
        parameters.push('e.status = |status|0|Integer')
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
