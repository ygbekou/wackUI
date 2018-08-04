import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Reference } from '../../models/reference';
 
@Injectable()
export class DiagnosisDropdown {
   
  filteredDiagnoses : Reference[];
  diagnoses : Reference[] = []; 
  
  constructor(
    private genericService: GenericService) {
    this.getAllDiagnoses();
  }
  
  filter(event) {
    this.filteredDiagnoses = DropdownUtil.filter(event, this.diagnoses);
  }
  
  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredDiagnoses = this.diagnoses;
    }, 10)
  }
  
  private getAllDiagnoses(): void {
    let parameters: string [] = []; 
    parameters.push('e.status = |status|0|Integer');
    
    this.genericService.getAllByCriteria('Diagnosis', parameters)
      .subscribe((data: Reference[]) => 
      { 
        this.diagnoses = data 
      },
      error => console.log(error),
      () => console.log('Get all Diagnoses complete'));
  }
  
}