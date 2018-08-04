import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Reference } from '../../models/reference';
 
@Injectable()
export class DoctorOrderPriorityDropdown {
  
  filteredDoctorOrderPriorities : Reference[];
  doctorOrderPriorities : Reference[] = []; 
  
  constructor(
    private genericService: GenericService) {
    this.getAllDoctorOrderPriorities();
  }
  
  filter(event) {
    this.filteredDoctorOrderPriorities = DropdownUtil.filter(event, this.doctorOrderPriorities);
  }
  
  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredDoctorOrderPriorities = this.doctorOrderPriorities;
    }, 10)
  }
  
  private getAllDoctorOrderPriorities(): void {
    let parameters: string [] = []; 
    parameters.push('e.status = |status|0|Integer');
    
    this.genericService.getAllByCriteria('DoctorOrderPriority', parameters)
      .subscribe((data: Reference[]) => 
      { 
        this.doctorOrderPriorities = data 
      },
      error => console.log(error),
      () => console.log('Get all DoctorOrderPriorities complete'));
  }
  
}