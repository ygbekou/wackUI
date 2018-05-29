import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Package } from '../../models/package';
 
@Injectable()
export class PackageDropdown {
  
  filteredPackages : Package[];
  packages : Package[] = []; 
  
  constructor(
    private genericService: GenericService) {
    this.getAllPackages();
  }
  
  filter(event) {
    this.filteredPackages = DropdownUtil.filter(event, this.packages);
  }
  
  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredPackages = this.packages;
    }, 10)
  }
  
  private getAllPackages(): void {
    this.genericService.getAll('Package')
      .subscribe((data: any[]) => {
        this.packages = data
      },
        
      error => console.log(error),
      () => console.log('Get All Packages Complete'));
  }
  
}