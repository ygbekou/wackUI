import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Floor } from '../../models/floor';
 
@Injectable()
export class FloorDropdown {
  
  filteredFloors : Floor[];
  floors : Floor[] = [];
  buildingId: number; 
  
  constructor(
    private genericService: GenericService) {
  }
  
  filter(event) {
    this.filteredFloors = DropdownUtil.filter(event, this.floors);
  }
  
  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredFloors = this.floors;
    }, 10)
  }
  
  public getAllFloors(): void {
    let parameters: string [] = []; 
            
    parameters.push('e.building.id = |buildingId|' + this.buildingId + '|Long')
    
    this.genericService.getAllByCriteria('Floor', parameters)
      .subscribe((data: any[]) => {
        this.floors = data
        
      },
        
      error => console.log(error),
      () => console.log('Get All Floors Complete'));
  }
  
}