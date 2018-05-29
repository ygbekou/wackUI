import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Reference } from '../../models/reference';
 
@Injectable()
export class ReligionDropdown {
  
  filteredReligions : Reference[];
  religions : Reference[] = []; 
  
  constructor(
    private genericService: GenericService) {
    this.getAllReligions();
  }
  
  filter(event) {
    this.filteredReligions = DropdownUtil.filter(event, this.religions);
  }
  
  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredReligions = this.religions;
    }, 10)
  }
  
  private getAllReligions(): void {
    let parameters: string [] = []; 
    parameters.push('e.status = |status|0|Integer');
    
    this.genericService.getAllByCriteria('Religion', parameters)
      .subscribe((data: Reference[]) => 
      { 
        this.religions = data 
      },
      error => console.log(error),
      () => console.log('Get all Religions complete'));
  }
  
}