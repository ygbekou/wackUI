import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Reference } from '../../models/reference';
 
@Injectable()
export class OccupationDropdown {
  
  filteredOccupations : Reference[];
  occupations : Reference[] = []; 
  
  constructor(
    private genericService: GenericService) {
    this.getAllOccupations();
  }
  
  filter(event) {
    this.filteredOccupations = DropdownUtil.filter(event, this.occupations);
  }
  
  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredOccupations = this.occupations;
    }, 10)
  }
  
  private getAllOccupations(): void {
    let parameters: string [] = []; 
    parameters.push('e.status = |status|0|Integer');
    
    this.genericService.getAllByCriteria('Occupation', parameters)
      .subscribe((data: Reference[]) => 
      { 
        this.occupations = data 
      },
      error => console.log(error),
      () => console.log('Get all Occupations complete'));
  }
  
}