import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Reference } from '../../models/reference';
 
@Injectable()
export class BuildingDropdown {
  
  filteredBuildings : Reference[];
  buildings : Reference[] = []; 
  
  constructor(
    private genericService: GenericService) {
    this.getAllBuildings();
  }
  
  filter(event) {
    this.filteredBuildings = DropdownUtil.filter(event, this.buildings);
  }
  
  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredBuildings = this.buildings;
    }, 10)
  }
  
  private getAllBuildings(): void {
    let parameters: string [] = []; 
    parameters.push('e.status = |status|0|Integer');
    
    this.genericService.getAllByCriteria('Building', parameters)
      .subscribe((data: Reference[]) => 
      { 
        this.buildings = data 
      },
      error => console.log(error),
      () => console.log('Get all Buildings complete'));
  }
  
}