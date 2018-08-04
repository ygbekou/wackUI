import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Reference } from '../../models/reference';
 
@Injectable()
export class DoctorOrderKindDropdown {
  
  filteredDoctorOrderKinds : Reference[];
  doctorOrderKinds : Reference[] = []; 
  
  constructor(
    private genericService: GenericService) {
    this.getAllDoctorOrderKinds();
  }
  
  filter(event) {
    this.filteredDoctorOrderKinds = DropdownUtil.filter(event, this.doctorOrderKinds);
  }
  
  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredDoctorOrderKinds = this.doctorOrderKinds;
    }, 10)
  }
  
  private getAllDoctorOrderKinds(): void {
    let parameters: string [] = []; 
    parameters.push('e.status = |status|0|Integer');
    
    this.genericService.getAllByCriteria('DoctorOrderKind', parameters)
      .subscribe((data: Reference[]) => 
      { 
        this.doctorOrderKinds = data 
      },
      error => console.log(error),
      () => console.log('Get all DoctorOrderKinds complete'));
  }
  
}