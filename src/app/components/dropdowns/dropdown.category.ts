import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Reference } from '../../models/reference';
 
@Injectable()
export class CategoryDropdown {
  
  filteredCategories : Reference[];
  categories : Reference[] = []; 
  
  constructor(
    private genericService: GenericService) {
    this.getAllCategories();
  }
  
  filter(event) {
    this.filteredCategories = DropdownUtil.filter(event, this.categories);
  }
  
  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredCategories = this.categories;
    }, 10)
  }
  
  private getAllCategories(): void {
    let parameters: string [] = []; 
    parameters.push('e.parent.id = |parentId|1|Long');
    parameters.push('e.status = |status|0|Integer');
    
    this.genericService.getAllByCriteria('Category', parameters)
      .subscribe((data: Reference[]) => 
      { 
        this.categories = data 
      },
      error => console.log(error),
      () => console.log('Get all Categories complete'));
  }
  
}