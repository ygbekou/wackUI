import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Supplier } from 'src/app/models';


@Injectable()
export class SupplierDropdown {

  filteredSuppliers: Supplier[];
  suppliers: Supplier[] = [];

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
    }, 10);
  }

  private getAllSuppliers(): void {
    const parameters: string [] = [];
    parameters.push('e.status = |status|0|Integer');
    this.genericService.getAllByCriteria('com.wack.model.stock.Supplier', parameters)
    .subscribe((data: Supplier[]) => {
        this.suppliers = data;
    },
    error => console.log(error),
    () => console.log('Get all Supplier complete'));
  }
}
