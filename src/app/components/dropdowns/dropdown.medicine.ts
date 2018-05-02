import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Medicine } from '../../models/medicine';
 
@Injectable()
export class MedicineDropdown {
  
  filteredMedicines : Medicine[];
  medicines : Medicine[] = []; 
  
  constructor(
    private genericService: GenericService) {
    this.getAllMedicines();
  }
  
  filter(event) {
    this.filteredMedicines = DropdownUtil.filter(event, this.medicines);
  }
  
  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredMedicines = this.medicines;
    }, 10)
  }
  
  private getAllMedicines(): void {
    this.genericService.getAll('Medicine')
      .subscribe((data: any[]) => {
        this.medicines = data
      },
        
      error => console.log(error),
      () => console.log('Get All Medicines Complete'));
  }
  
}