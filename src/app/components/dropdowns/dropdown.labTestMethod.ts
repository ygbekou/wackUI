import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Reference } from '../../models/reference';
 
@Injectable()
export class LabTestMethodDropdown {
  
  filteredLabTestMethods : Reference[];
  labTestMethods : Reference[] = []; 
  
  constructor(
    private genericService: GenericService) {
    this.getAllLabTestMethods();
  }
  
  filter(event) {
    this.filteredLabTestMethods = DropdownUtil.filter(event, this.labTestMethods);
  }
  
  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredLabTestMethods = this.labTestMethods;
    }, 10)
  }
  
  private getAllLabTestMethods(): void {
    this.genericService.getActiveElements('labTestMethod')
      .subscribe((data: any[]) => this.labTestMethods = data,
      error => console.log(error),
      () => console.log('Get All labTestMethods Complete'));
  }
  
}