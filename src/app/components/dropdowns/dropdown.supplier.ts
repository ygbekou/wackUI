import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Supplier } from '../../models/supplier';
 
@Injectable()
export class SupplierDropdown {
  
  filteredSuppliers : Supplier[];
  suppliers : Supplier[] = []; 
  
  constructor(
    private genericService: GenericService) {
    this.getAllSuppliers();
  }
  
  filter(event) {
    this.filteredSuppliers = DropdownUtil.filter(event, this.suppliers);
  }
  
  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredSuppliers = this.suppliers;
    }, 10)
  }
  
  private getAllSuppliers(): void {
    this.genericService.getAll('com.qkcare.model.stocks.Supplier')
      .subscribe((data: any[]) => {
        this.suppliers = data
      },
        
      error => console.log(error),
      () => console.log('Get All Suppliers Complete'));
  }
  
}