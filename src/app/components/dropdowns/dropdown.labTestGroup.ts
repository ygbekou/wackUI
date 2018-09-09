import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services';
import { Reference } from '../../models/reference';
 
@Injectable()
export class LabTestGroupDropdown {
  
  filteredLabTestGroups : Reference[];
  labTestGroups : Reference[] = []; 
  
  constructor(
    private genericService: GenericService) {
    this.getActiveLabTestGroups();
  }
  
  filter(event) {
    this.filteredLabTestGroups = DropdownUtil.filter(event, this.labTestGroups);
  }
  
  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredLabTestGroups = this.labTestGroups;
    }, 10)
  }
  
  private getActiveLabTestGroups(): void {
    this.genericService.getActiveElements('labTestGroup')
      .subscribe((data: any[]) => this.labTestGroups = data,
      error => console.log(error),
      () => console.log('Get All labTestGroups Complete'));
  }
  
}