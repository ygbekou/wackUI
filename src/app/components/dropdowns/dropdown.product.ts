import { Injectable, OnInit } from '@angular/core';
import { DropdownUtil } from './dropdown.util';
import { GenericService } from '../../services/generic.service';
import { Reference } from 'src/app/models';


@Injectable()
export class ProductDropdown {

  filteredProducts: Reference[];
  products: Reference[] = [];

  constructor(
    private genericService: GenericService) {
    this.getAllProducts();
  }

  filter(event) {
    this.filteredProducts = DropdownUtil.filter(event, this.products);
  }

  handleDropdownClick(event) {
    setTimeout(() => {
      this.filteredProducts = this.products;
    }, 10);
  }

  private getAllProducts(): void {
    const parameters: string [] = [];
    this.genericService.getAllByCriteria('com.wack.model.stock.Product', parameters)
    .subscribe((data: Reference[]) => {
        this.products = data;
    },
    error => console.log(error),
    () => console.log('Get all Product complete'));
  }
}
