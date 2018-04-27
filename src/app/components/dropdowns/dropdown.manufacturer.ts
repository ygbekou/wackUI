import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Reference } from '../../models/reference';
 
@Injectable()
export class ManufacturerDropdown {
  
  filteredManufacturers : Reference[];
  manufacturers : Reference[] = []; 
  
  constructor(
    private genericService: GenericService) {
    this.getAllManufacturers();
  }
  
  filter(event) {
    this.filteredManufacturers = DropdownUtil.filter(event, this.manufacturers);
  }
  
  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredManufacturers = this.manufacturers;
    }, 10)
  }
  
  private getAllManufacturers(): void {
    let parameters: string [] = []; 
    parameters.push('e.status = |status|0|Integer');
    
    this.genericService.getAllByCriteria('Manufacturer', parameters)
      .subscribe((data: Reference[]) => 
      { 
        this.manufacturers = data 
      },
      error => console.log(error),
      () => console.log('Get all Manufacturers complete'));
  }
  
}