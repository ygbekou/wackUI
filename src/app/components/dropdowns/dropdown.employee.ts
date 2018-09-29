import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Employee } from '../../models/Employee';
 
@Injectable()
export class EmployeeDropdown {
  
  filteredEmployees : Employee[];
  employees : Employee[] = []; 
  
  constructor(
    private genericService: GenericService) {
    this.getAllEmployees();
  }
  
  filter(event) {
    this.filteredEmployees = DropdownUtil.filter(event, this.employees);
  }
  
  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredEmployees = this.employees;
    }, 10)
  }
  
  private getAllEmployees(): void {
    let parameters: string [] = []; 
    //parameters.push('e.user.userGroup.id != |userGroupId|1|Long');
    
    this.genericService.getAllByCriteria('Employee', parameters)
      .subscribe((data: Employee[]) => 
      { 
        this.employees = data 
      },
      error => console.log(error),
      () => console.log('Get all Employees complete'));
  }
  
}