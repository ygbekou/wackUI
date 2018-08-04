import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Reference } from '../../models/reference';
 
@Injectable()
export class DoctorOrderTypeDropdown {
  
  filteredDoctorOrderTypes : Reference[];
  doctorOrderTypes : Reference[] = []; 
  
  constructor(
    private genericService: GenericService) {
    this.getAllDoctorOrderTypes();
  }
  
  filter(event) {
    this.filteredDoctorOrderTypes = DropdownUtil.filter(event, this.doctorOrderTypes);
  }
  
  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredDoctorOrderTypes = this.doctorOrderTypes;
    }, 10)
  }
  
  private getAllDoctorOrderTypes(): void {
    let parameters: string [] = []; 
    parameters.push('e.status = |status|0|Integer');
    
    this.genericService.getAllByCriteria('DoctorOrderType', parameters)
      .subscribe((data: Reference[]) => 
      { 
        this.doctorOrderTypes = data 
      },
      error => console.log(error),
      () => console.log('Get all DoctorOrderTypes complete'));
  }
  
}