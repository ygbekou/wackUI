import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Employee } from 'src/app/models';


@Injectable()
export class ManagerDropdown {

  filteredManagers: Employee[];
  managers: Employee[] = [];

  parameters: string [] = [];

  constructor(
    private genericService: GenericService) {
    this.getAllManagers();
  }

  filter(event) {
    this.filteredManagers = DropdownUtil.filter(event, this.managers);
  }

  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredManagers = this.managers;
    }, 10);
  }

  public getAllManagers(): void {
    this.parameters.push('e.status = |status|0|Integer');
    this.parameters.push('e.managing = |managing|0|Integer');
    this.genericService.getAllByCriteria('com.wack.model.Employee', this.parameters)
    .subscribe((data: Employee[]) => {
        this.managers = data;
    },
    error => console.log(error),
    () => console.log('Get all Managers complete'));
  }
}
