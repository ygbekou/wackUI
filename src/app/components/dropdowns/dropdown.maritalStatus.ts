import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Reference } from '../../models/reference';
 
@Injectable()
export class MaritalStatusDropdown {
  
  filteredMaritalStatuses : Reference[];
  maritalStatuses : Reference[] = []; 
  
  constructor(
    private genericService: GenericService) {
    this.getAllMaritalStatuses();
  }
  
  filter(event) {
    this.filteredMaritalStatuses = DropdownUtil.filter(event, this.maritalStatuses);
  }
  
  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredMaritalStatuses = this.maritalStatuses;
    }, 10)
  }
  
  private getAllMaritalStatuses(): void {
    let parameters: string [] = []; 
    parameters.push('e.status = |status|0|Integer');
    
    this.genericService.getAllByCriteria('MaritalStatus', parameters)
      .subscribe((data: Reference[]) => 
      { 
        this.maritalStatuses = data 
      },
      error => console.log(error),
      () => console.log('Get all MaritalStatuses complete'));
  }
  
}