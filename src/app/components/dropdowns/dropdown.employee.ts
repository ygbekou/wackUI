import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Employee } from 'src/app/models';


@Injectable()
export class EmployeeDropdown {

  filteredEmployees: Employee[];
  employees: Employee[] = [];

  parameters: string [] = [];

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
    }, 10);
  }

  public getAllEmployees(): void {
    this.parameters.push('e.status = |status|0|Integer');
    this.genericService.getAllByCriteria('com.wack.model.Employee', this.parameters)
    .subscribe((data: Employee[]) => {
        this.employees = data;
    },
    error => console.log(error),
    () => console.log('Get all Employee complete'));
  }
}
