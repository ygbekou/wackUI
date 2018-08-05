import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Reference } from '../../models/reference';
 
@Injectable()
export class VaccineDropdown {
  
  filteredVaccines : Reference[];
  vaccines : Reference[] = []; 
  
  constructor(
    private genericService: GenericService) {
    this.getAllVaccines();
  }
  
  filter(event) {
    this.filteredVaccines = DropdownUtil.filter(event, this.vaccines);
  }
  
  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredVaccines = this.vaccines;
    }, 10)
  }
  
  private getAllVaccines(): void {
    this.genericService.getAll('Vaccine')
      .subscribe((data: any[]) => {
        this.vaccines = data
      },
        
      error => console.log(error),
      () => console.log('Get All Vaccines Complete'));
  }
  
}