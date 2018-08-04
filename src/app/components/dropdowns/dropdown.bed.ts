import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Bed } from '../../models/bed';
 
@Injectable()
export class BedDropdown {
  
  filteredBeds : Bed[];
  beds : Bed[] = [];
  roomId: number; 
  categoryId: number;
  
  constructor(
    private genericService: GenericService) {
  }
  
  filter(event) {
    this.filteredBeds = DropdownUtil.filter(event, this.beds);
  }
  
  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredBeds = this.beds;
    }, 10)
  }
  
  public getAllBeds(): void {
    let parameters: string [] = []; 
    
    if (this.roomId != null) {      
      parameters.push('e.room.id = |roomId|' + this.roomId + '|Long')
    }
    if (this.categoryId != null) {      
      parameters.push('e.category.id = |categoryId|' + this.categoryId + '|Long')
    }
    
    this.genericService.getAllByCriteria('Bed', parameters)
      .subscribe((data: any[]) => {
        this.beds = data
        
      },
        
      error => console.log(error),
      () => console.log('Get All Beds Complete'));
  }
  
}