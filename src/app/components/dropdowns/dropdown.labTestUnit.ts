import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil }       from './dropdown.util';
import { GenericService }     from '../../services/generic.service';
import { Reference }          from '../../models/reference';
 
@Injectable()
export class LabTestUnitDropdown {
  
  filteredLabTestUnits : Reference[];
  labTestUnits : Reference[] = []; 
  
  constructor(
    private genericService: GenericService) {
    this.getAllLabTestUnits();
  }
  
  filter(event) {
    this.filteredLabTestUnits = DropdownUtil.filter(event, this.labTestUnits);
  }
  
  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredLabTestUnits = this.labTestUnits;
    }, 10)
  }
  
  private getAllLabTestUnits(): void {
    this.genericService.getActiveElements('labTestUnit')
      .subscribe((data: any[]) => this.labTestUnits = data,
      error => console.log(error),
      () => console.log('Get All labTestUnits Complete'));
  }
  
}