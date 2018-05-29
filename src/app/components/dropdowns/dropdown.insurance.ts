import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Insurance } from '../../models/insurance';
 
@Injectable()
export class InsuranceDropdown {
  
  filteredInsurances : Insurance[];
  insurances : Insurance[] = []; 
  
  constructor(
    private genericService: GenericService) {
    this.getAllInsurances();
  }
  
  filter(event) {
    this.filteredInsurances = DropdownUtil.filter(event, this.insurances);
  }
  
  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredInsurances = this.insurances;
    }, 10)
  }
  
  private getAllInsurances(): void {
    this.genericService.getAll('Insurance')
      .subscribe((data: any[]) => {
        this.insurances = data
      },
        
      error => console.log(error),
      () => console.log('Get All Insurances Complete'));
  }
  
}