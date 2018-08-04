import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService, GlobalEventsManager } from '../../services';
import { Reference } from '../../models/reference';
 
@Injectable()
export class CategoryDropdown {
  
  filteredCategories : Reference[];
  categories : Reference[] = []; 
  
  parentId: number;
  
  constructor(
    private genericService: GenericService,
    private globalEventsManager: GlobalEventsManager) {
    //this.getAllCategories();
  }
  
  filter(event) {
    this.filteredCategories = DropdownUtil.filter(event, this.categories);
  }
  
  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredCategories = this.categories;
    }, 10)
  }
  
  public getAllCategories(categoryParentId: number): void {
    let parameters: string [] = []; 
    parameters.push('e.parent.id = |parentId|' + categoryParentId + '' + '|Long');
    parameters.push('e.status = |status|0|Integer');
    
    this.genericService.getAllByCriteria('Category', parameters)
      .subscribe((data: Reference[]) => 
      { 
        this.categories = data 
      },
      error => console.log(error),
      () => console.log('Get all Categories complete'));
  }
  
  public getGroupCategories(): void {
    let parameters: string [] = []; 
    parameters.push('e.id <= |parentId|100|Long');
    parameters.push('e.status = |status|0|Integer');
    
    this.genericService.getAllByCriteria('Category', parameters)
      .subscribe((data: Reference[]) => 
      { 
        this.categories = data 
      },
      error => console.log(error),
      () => console.log('Get all Group Categories complete'));
  }
  
}