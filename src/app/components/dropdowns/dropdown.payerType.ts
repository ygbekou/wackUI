import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Reference } from '../../models/reference';
 
@Injectable()
export class PayerTypeDropdown {
  
  filteredPayerTypes : Reference[];
  payerTypes : Reference[] = []; 
  
  constructor(
    private genericService: GenericService) {
    this.getAllPayerTypes();
  }
  
  filter(event) {
    this.filteredPayerTypes = DropdownUtil.filter(event, this.payerTypes);
  }
  
  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredPayerTypes = this.payerTypes;
    }, 10)
  }
  
  private getAllPayerTypes(): void {
    let parameters: string [] = []; 
    parameters.push('e.status = |status|0|Integer');
    
    this.genericService.getAllByCriteria('PayerType', parameters)
      .subscribe((data: Reference[]) => 
      { 
        this.payerTypes = data 
      },
      error => console.log(error),
      () => console.log('Get all PayerTypes complete'));
  }
  
}